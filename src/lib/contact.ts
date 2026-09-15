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

export type SendResult =
  | { ok: true }
  /**
   * `mailto` settes kun når ingen sendevei er konfigurert. Da har skjemaet
   * ingen måte å levere meldingen på, og det eneste anstendige er å gi den
   * besøkende teksten sin tilbake i et e-postutkast framfor en blindvei.
   */
  | { ok: false; error: string; mailto?: string }

const FALLBACK_EMAIL = 'michael@firix.no'

/** Bygger et ferdig utfylt e-postutkast av det den besøkende skrev. */
function mailtoDraft(payload: ContactPayload): string {
  const linjer = [
    `Navn: ${payload.name}`,
    payload.company ? `Bedrift: ${payload.company}` : '',
    `E-post: ${payload.email}`,
    payload.phone ? `Telefon: ${payload.phone}` : '',
    payload.budget ? `Budsjett: ${payload.budget}` : '',
    '',
    payload.message,
  ].filter((linje, index) => linje !== '' || index === 5)

  const emne = `Henvendelse fra ${payload.name}${payload.company ? ` (${payload.company})` : ''}`
  return `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(emne)}&body=${encodeURIComponent(
    linjer.join('\n'),
  )}`
}

/**
 * Hva vårt eget API gjorde med forespørselen.
 *
 * `unavailable` dekker både «ruten finnes ikke» og «ruten finnes, men
 * feilet». De to er like for en reserveløsning, men ikke for deg:
 * `serverError` tar vare på serverens egen forklaring, så den kan vises hvis
 * reserven heller ikke kommer fram.
 */
type ApiOutcome =
  | { kind: 'sent' }
  | { kind: 'rejected'; error: string }
  | { kind: 'unavailable'; serverError?: string }

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

/** Sender via vår egen /api/contact. */
async function viaApi(payload: ContactPayload): Promise<ApiOutcome> {
  let res: Response
  try {
    res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    return { kind: 'unavailable' }
  }

  const data = await readJson(res)
  if (data === null) return { kind: 'unavailable' }
  if (res.ok) return { kind: 'sent' }

  // 400 med JSON er et ekte avslag fra vår server — for eksempel en ugyldig
  // e-postadresse. Det skal vises, ikke skjules bak et nytt forsøk.
  if (res.status === 400 && typeof data.error === 'string') {
    return { kind: 'rejected', error: data.error }
  }

  // Alt annet kan reserven kanskje redde, men vi tar vare på beskjeden. En
  // 503 «ikke konfigurert» er nettopp det som må fram hvis den ikke gjør det.
  return {
    kind: 'unavailable',
    serverError: typeof data.error === 'string' ? data.error : undefined,
  }
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
 *
 * Kommer ingen av veiene fram, vises serverens egen forklaring framfor
 * reservens generiske melding. Ellers skjuler «skjemaet er ikke satt opp»
 * den faktiske årsaken, som gjerne er en manglende miljøvariabel.
 */
export async function sendContact(payload: ContactPayload): Promise<SendResult> {
  // Honeypot: lat som alt gikk bra, ikke lær boten at den ble stoppet.
  if (payload.website) return { ok: true }

  const api = await viaApi(payload)
  if (api.kind === 'sent') return { ok: true }
  if (api.kind === 'rejected') return { ok: false, error: api.error }

  const fallback = await viaWeb3Forms(payload)
  if (fallback.ok) return fallback

  // Ingen av veiene kom fram. Serverens egen forklaring er mer presis enn
  // reservens generiske melding, så den vinner når vi har den.
  return {
    ok: false,
    error: api.serverError ? `${api.serverError}` : fallback.error,
    mailto: mailtoDraft(payload),
  }
}
