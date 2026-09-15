import type { VercelRequest, VercelResponse } from '@vercel/node'
import { issueToken, safeEqual } from './_auth'

/**
 * Bytter admin-passordet mot et kortlevd signert token.
 * Passordet forlater aldri serveren.
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const expected = process.env.ADMIN_PASSWORD
  if (!expected) {
    return res.status(503).json({ error: 'ADMIN_PASSWORD er ikke satt i miljøvariablene.' })
  }

  const password = typeof req.body?.password === 'string' ? req.body.password : ''
  if (!password || !safeEqual(password, expected)) {
    // Bevisst vag feilmelding — ikke avslør om passordet finnes eller er feil.
    return res.status(401).json({ error: 'Feil passord.' })
  }

  const token = issueToken()
  if (!token) return res.status(503).json({ error: 'Kunne ikke utstede token.' })

  return res.status(200).json({ token })
}
