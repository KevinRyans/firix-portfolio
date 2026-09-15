import type { VercelRequest, VercelResponse } from '@vercel/node'
import { bearer, verifyToken } from './_auth'

/**
 * Sjekker om et nettsted lar seg vise i en iframe.
 *
 * Dette må gjøres på serveren. En blokkert iframe fyrer `load` som vanlig i
 * nettleseren, og alle egenskaper på den kaster samme SecurityError som en
 * helt normal kryssdomene-ramme — det finnes ingen måte å skille dem på fra
 * klienten. Serveren kan derimot lese svarhodene direkte.
 */

/** Hindrer at et admin-endepunkt brukes til å nå interne tjenester. */
function isPublicHttpUrl(raw: string): URL | null {
  let url: URL
  try {
    url = new URL(raw)
  } catch {
    return null
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null

  const host = url.hostname.toLowerCase()
  const blocked =
    host === 'localhost' ||
    host.endsWith('.localhost') ||
    host.endsWith('.internal') ||
    host === '0.0.0.0' ||
    host === '::1' ||
    host === '[::1]' ||
    /^127\./.test(host) ||
    /^10\./.test(host) ||
    /^192\.168\./.test(host) ||
    /^169\.254\./.test(host) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(host)

  return blocked ? null : url
}

function verdict(headers: Headers): { embeddable: boolean; reason: string } {
  const xfo = headers.get('x-frame-options')?.trim().toUpperCase()
  if (xfo === 'DENY') {
    return { embeddable: false, reason: 'Nettstedet sender X-Frame-Options: DENY.' }
  }
  if (xfo === 'SAMEORIGIN') {
    return { embeddable: false, reason: 'Nettstedet sender X-Frame-Options: SAMEORIGIN.' }
  }

  const csp = headers.get('content-security-policy') ?? ''
  const directive = csp
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.toLowerCase().startsWith('frame-ancestors'))

  if (directive) {
    const value = directive.slice('frame-ancestors'.length).trim().toLowerCase()
    if (value === "'none'") {
      return { embeddable: false, reason: "CSP frame-ancestors er satt til 'none'." }
    }
    if (!value.includes('*') && !value.includes('firix.no')) {
      return {
        embeddable: false,
        reason: `CSP frame-ancestors tillater bare: ${directive.slice('frame-ancestors'.length).trim()}`,
      }
    }
  }

  return { embeddable: true, reason: 'Ingen hoder som blokkerer innramming.' }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  if (!verifyToken(bearer(req.headers.authorization))) {
    return res.status(401).json({ error: 'Ikke autorisert.' })
  }

  const raw = typeof req.query.url === 'string' ? req.query.url : ''
  const url = isPublicHttpUrl(raw)
  if (!url) return res.status(400).json({ error: 'Ugyldig eller ikke tillatt adresse.' })

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      redirect: 'follow',
      headers: { 'User-Agent': 'firix.no preview-check' },
      signal: AbortSignal.timeout(10000),
    })
    return res.status(200).json({ ...verdict(response.headers), status: response.status })
  } catch {
    return res.status(200).json({
      embeddable: false,
      reason: 'Fikk ikke kontakt med nettstedet.',
      status: 0,
    })
  }
}
