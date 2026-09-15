import type { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * Henter et skjermbilde av et nettsted og serverer det fra vårt eget domene.
 *
 * Grunnen til å gå via serveren i stedet for å peke <img> rett på tjenesten:
 *  - Vercel cacher svaret på kanten, så tjenesten treffes svært sjelden.
 *  - Besøkende ser ikke hvilken tredjepart som brukes, og sender ingen
 *    forespørsel dit selv.
 *  - Tjenesten bygger bildet i bakgrunnen første gang. Vi kan vente på at
 *    det blir ferdig her, i stedet for å vise et halvferdig bilde.
 *
 * Endepunktet er offentlig fordi bildene vises på en offentlig side, men det
 * tar bare imot offentlige http(s)-adresser.
 */

const MAX_WIDTH = 1600
const MIN_IMAGE_BYTES = 8000
const ATTEMPTS = 3
const RETRY_DELAY_MS = 1500

function publicUrl(raw: string): URL | null {
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

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const target = publicUrl(typeof req.query.url === 'string' ? req.query.url : '')
  if (!target) return res.status(400).json({ error: 'Ugyldig eller ikke tillatt adresse.' })

  const requested = Number(req.query.w)
  const width = Number.isFinite(requested) ? Math.min(Math.max(requested, 320), MAX_WIDTH) : 1200
  const height = Math.round((width * 750) / 1200)

  const source = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(
    target.toString(),
  )}?w=${width}&h=${height}`

  for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
    try {
      const response = await fetch(source, {
        redirect: 'follow',
        headers: { 'User-Agent': 'firix.no screenshot' },
        signal: AbortSignal.timeout(12000),
      })
      if (!response.ok) throw new Error(String(response.status))

      const buffer = Buffer.from(await response.arrayBuffer())

      // Tjenesten svarer med et lite plassholderbilde mens den fortsatt
      // bygger det ekte. Vent og prøv igjen i stedet for å cache søppel.
      if (buffer.byteLength < MIN_IMAGE_BYTES && attempt < ATTEMPTS - 1) {
        await wait(RETRY_DELAY_MS)
        continue
      }

      res.setHeader('Content-Type', response.headers.get('content-type') ?? 'image/jpeg')
      res.setHeader(
        'Cache-Control',
        // En uke på kanten. Nettsteder endrer seg sjelden, og et gammelt
        // bilde er uansett bedre enn ingen bilde mens et nytt hentes.
        'public, max-age=3600, s-maxage=604800, stale-while-revalidate=604800',
      )
      return res.status(200).send(buffer)
    } catch {
      if (attempt < ATTEMPTS - 1) await wait(RETRY_DELAY_MS)
    }
  }

  // Ingen caching av feil — klienten faller videre til neste kilde.
  res.setHeader('Cache-Control', 'no-store')
  return res.status(502).json({ error: 'Kunne ikke hente skjermbilde.' })
}
