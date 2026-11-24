export type ContactPayload = {
  name: string
  company: string
  email: string
  phone: string
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
    '',
    payload.message,
  ].filter((linje, index) => linje !== '' || index === 4)

  const emne = `Henvendelse fra ${payload.name}${payload.company ? ` (${payload.company})` : ''}`
  return `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(emne)}&body=${encodeURIComponent(
    linjer.join('\n'),
  )}`
}

/**
 * Hva vårt eget API gjorde med forespørselen.
 *
 * `unavailable` dekker både «ruten finnes ikke» og «ruten finnes, men
 * feilet». `serverError` tar vare på serverens egen forklaring.
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

  // En 503 «ikke konfigurert» er nettopp det som må fram til den besøkende.
  return {
    kind: 'unavailable',
    serverError: typeof data.error === 'string' ? data.error : undefined,
  }
}

/**
 * Sender henvendelsen via /api/contact (Resend).
 *
 * Kommer den ikke fram, får den besøkende serverens egen forklaring og et
 * ferdig utfylt e-postutkast, framfor en blindvei.
 */
export async function sendContact(payload: ContactPayload): Promise<SendResult> {
  // Honeypot: lat som alt gikk bra, ikke lær boten at den ble stoppet.
  if (payload.website) return { ok: true }

  const api = await viaApi(payload)
  if (api.kind === 'sent') return { ok: true }
  if (api.kind === 'rejected') return { ok: false, error: api.error }

  return {
    ok: false,
    error:
      api.serverError ??
      `Skjemaet er ikke satt opp riktig. Send gjerne en e-post direkte til ${FALLBACK_EMAIL}.`,
    mailto: mailtoDraft(payload),
  }
}
