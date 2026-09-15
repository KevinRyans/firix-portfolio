import { createHmac, timingSafeEqual } from 'node:crypto'

/**
 * Minimal signert sesjonstoken for admin-panelet.
 *
 * Passordet lever kun som en server-side miljøvariabel (`ADMIN_PASSWORD`) og
 * havner aldri i JavaScript-bundlen. Klienten får et HMAC-signert token med
 * utløpstid som verifiseres på hver skrivende forespørsel.
 */

const TTL_MS = 1000 * 60 * 60 * 8

function secret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || null
}

function sign(payload: string, key: string): string {
  return createHmac('sha256', key).update(payload).digest('base64url')
}

/** Konstant-tid sammenligning som ikke kaster på ulik lengde. */
export function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

export function issueToken(): string | null {
  const key = secret()
  if (!key) return null
  const expires = String(Date.now() + TTL_MS)
  return `${expires}.${sign(expires, key)}`
}

export function verifyToken(token: string | undefined): boolean {
  const key = secret()
  if (!key || !token) return false

  const separator = token.indexOf('.')
  if (separator <= 0) return false

  const expires = token.slice(0, separator)
  const signature = token.slice(separator + 1)

  const expiresAt = Number(expires)
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false

  return safeEqual(signature, sign(expires, key))
}

export function bearer(header: string | string[] | undefined): string | undefined {
  const value = Array.isArray(header) ? header[0] : header
  if (!value) return undefined
  return value.startsWith('Bearer ') ? value.slice(7) : value
}
