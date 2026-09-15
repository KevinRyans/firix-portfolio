import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const TO = 'michael@firix.no'
const FROM = 'Firix <noreply@firix.no>'

/** Innhold fra skjemaet havner i en HTML-e-post, så det må escapes. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function toParagraphs(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, '<br>')
}

/**
 * Skiller oppsettsfeil fra forbigående feil.
 *
 * Et avvist domene eller en ugyldig nøkkel er noe DU må rette, og går ikke
 * over av seg selv. En tidsavbrudd hos leverandøren gjør det. De to fortjener
 * ulike svar: den første skal si at oppsettet mangler noe, den andre skal
 * la reserveløsningen forsøke.
 */
function isSetupProblem(error: unknown): boolean {
  const message = (error instanceof Error ? error.message : String(error)).toLowerCase()
  return (
    message.includes('not verified') ||
    message.includes('domain') ||
    message.includes('unauthorized') ||
    message.includes('api key') ||
    message.includes('forbidden') ||
    message.includes('invalid') ||
    message.includes('403') ||
    message.includes('401')
  )
}

function row(label: string, value: string): string {
  if (!value) return ''
  return `<tr><td style="padding:6px 16px 6px 0;color:#6e6e73;font-size:13px;vertical-align:top">${escapeHtml(
    label,
  )}</td><td style="padding:6px 0;color:#1d1d1f;font-size:15px">${escapeHtml(value)}</td></tr>`
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return res.status(503).json({ error: 'E-postutsending er ikke konfigurert.' })
  }

  const body = (req.body ?? {}) as Record<string, unknown>
  const str = (key: string, max = 5000) => {
    const value = body[key]
    return typeof value === 'string' ? value.trim().slice(0, max) : ''
  }

  // Honeypot: ekte brukere ser aldri dette feltet. Svar 200 så boten ikke
  // lærer at den ble stoppet.
  if (str('website')) return res.status(200).json({ ok: true })

  const name = str('name', 120)
  const email = str('email', 200)
  const company = str('company', 120)
  const phone = str('phone', 60)
  const budget = str('budget', 80)
  const message = str('message', 5000)

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Navn, e-post og melding må fylles ut.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return res.status(400).json({ error: 'E-postadressen ser ikke gyldig ut.' })
  }

  const resend = new Resend(apiKey)

  const ownerHtml = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;max-width:600px">
      <h2 style="font-size:20px;color:#1d1d1f;margin:0 0 20px">Ny henvendelse fra ${escapeHtml(name)}</h2>
      <table style="border-collapse:collapse;width:100%">
        ${row('Navn', name)}${row('Bedrift', company)}${row('E-post', email)}
        ${row('Telefon', phone)}${row('Budsjett', budget)}
      </table>
      <div style="margin-top:24px;padding-top:20px;border-top:1px solid #e8e8ed">
        <p style="color:#6e6e73;font-size:13px;margin:0 0 8px">Melding</p>
        <p style="color:#1d1d1f;font-size:15px;line-height:1.6;margin:0">${toParagraphs(message)}</p>
      </div>
    </div>`

  const visitorHtml = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;max-width:600px">
      <h2 style="font-size:20px;color:#1d1d1f;margin:0 0 16px">Takk for henvendelsen, ${escapeHtml(
        name,
      )}!</h2>
      <p style="color:#424245;font-size:15px;line-height:1.6;margin:0 0 20px">
        Jeg har mottatt meldingen din og svarer normalt innen 24 timer.
      </p>
      <div style="padding:16px 20px;background:#f5f5f7;border-radius:12px">
        <p style="color:#6e6e73;font-size:13px;margin:0 0 8px">Dette sendte du:</p>
        <p style="color:#1d1d1f;font-size:15px;line-height:1.6;margin:0">${toParagraphs(message)}</p>
      </div>
      <p style="color:#86868b;font-size:13px;margin:24px 0 0">— Michael, Firix</p>
    </div>`

  try {
    // Varselet til deg er det kritiske. Kvitteringen til kunden er hyggelig,
    // men skal aldri velte hele forespørselen.
    const owner = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Ny henvendelse: ${name}${company ? ` (${company})` : ''}`,
      html: ownerHtml,
    })
    if (owner.error) throw new Error(owner.error.message)

    void resend.emails
      .send({
        from: FROM,
        to: email,
        subject: 'Takk for henvendelsen — Firix',
        html: visitorHtml,
      })
      .catch((err) => console.error('kvittering feilet', err))

    return res.status(200).json({ ok: true })
  } catch (error) {
    // Hele årsaken havner i Runtime Logs uansett. Den vises ikke til
    // besøkende, men uten den er oppsettsfeil umulige å finne.
    console.error('[contact] utsending feilet:', error)

    if (isSetupProblem(error)) {
      return res.status(503).json({
        error: `E-postutsending er ikke satt opp riktig ennå — se Runtime Logs for årsaken.`,
      })
    }

    return res
      .status(500)
      .json({ error: `Sendingen feilet. Send gjerne en e-post direkte til ${TO}.` })
  }
}
