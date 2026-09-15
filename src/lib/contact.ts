export type ContactPayload = {
  name: string
  company: string
  email: string
  phone: string
  budget: string
  message: string
  /** Honeypot. Fylles kun ut av bots. */
  website: string
}

export type SendResult = { ok: true } | { ok: false; error: string }

const FALLBACK_EMAIL = 'michael@firix.no'
const noBackend = Symbol('no-backend')

async function readJson(res: Response): Promise<Record<string, unknown> | null> {
  // En host uten /api svarer med HTML (404-siden) eller 405. Da er det ikke
  // et avslag fra oss — det er fravær av backend.
  if (!res.headers.get('content-type')?.includes('application/json')) return null
  try {
    return (await res.json()) as Record<string, unknown>
  } catch {
    return null
  }
}

/** Sender via vår egen /api/contact. Kaster `noBackend` hvis ruten ikke finnes. */
async function viaApi(payload: ContactPayload): Promise<SendResult> {
  let res: Response
  try {
    res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw noBackend
  }

  const data = await readJson(res)
  if (data === null) throw noBackend

  if (res.ok) return { ok: true }

  // 400 med JSON er en ekte valideringsfeil fra vår server. Den skal vises,
  // ikke skjules bak et nytt forsøk mot en annen tjeneste.
  if (res.status === 400 && typeof data.error === 'string') {
    return { ok: false, error: data.error }
  }

  throw noBackend
}

/** Reserveløsning på hosting uten backend (GitHub Pages). */
async function viaWeb3Forms(payload: ContactPayload): Promise<SendResult> {
  const key = import.meta.env.VITE_WEB3FORMS_KEY
  if (!key) {
    return {
      ok: false,
      error: `Skjemaet er ikke satt opp riktig. Send gjerne en e-post direkte til ${FALLBACK_EMAIL}.`,
    }
  }

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: key,
        subject: `Ny henvendelse: ${payload.name}${payload.company ? ` (${payload.company})` : ''}`,
        name: payload.name,
        email: payload.email,
        ...(payload.company ? { bedrift: payload.company } : {}),
        ...(payload.phone ? { telefon: payload.phone } : {}),
        ...(payload.budget ? { budsjett: payload.budget } : {}),
        message: payload.message,
        botcheck: payload.website ? 'true' : '',
      }),
    })
    const data = (await res.json()) as { success?: boolean; message?: string }
    if (data.success) return { ok: true }
    return {
      ok: false,
      error: `Sendingen feilet. Send gjerne en e-post direkte til ${FALLBACK_EMAIL}.`,
    }
  } catch {
    return {
      ok: false,
      error: `Fikk ikke kontakt med serveren. Send gjerne en e-post direkte til ${FALLBACK_EMAIL}.`,
    }
  }
}

/**
 * Sender henvendelsen uavhengig av hvor siden er hostet.
 *
 * Kjører siden på Vercel går den via vår egen /api/contact med Resend.
 * Kjører den på GitHub Pages — som ikke kan kjøre kode — faller den
 * automatisk tilbake til Web3Forms. En besøkende skal aldri møte et skjema
 * som feiler fordi hostingen mangler en backend.
 */
export async function sendContact(payload: ContactPayload): Promise<SendResult> {
  // Honeypot: lat som alt gikk bra, ikke lær boten at den ble stoppet.
  if (payload.website) return { ok: true }

  try {
    return await viaApi(payload)
  } catch (error) {
    if (error !== noBackend) {
      return { ok: false, error: `Noe gikk galt. Send gjerne en e-post til ${FALLBACK_EMAIL}.` }
    }
    return viaWeb3Forms(payload)
  }
}
