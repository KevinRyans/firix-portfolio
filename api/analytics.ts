import type { VercelRequest, VercelResponse } from '@vercel/node'
import { bearer, verifyToken } from './_auth.js'
import { KV_TOKEN, KV_URL } from './_kv.js'

async function kv(commands: unknown[][]): Promise<unknown[]> {
  if (!KV_URL || !KV_TOKEN) return []
  const res = await fetch(`${KV_URL}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
  })
  const json = (await res.json()) as { result: unknown }[]
  return json.map((item) => item.result)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).end()

  if (!verifyToken(bearer(req.headers.authorization))) {
    return res.status(401).json({ error: 'Ikke autorisert.' })
  }

  if (!KV_URL || !KV_TOKEN) {
    return res.status(200).json({ configured: false })
  }

  const days: string[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000)
    days.push(d.toISOString().slice(0, 10))
  }

  const commands: unknown[][] = [
    ['GET', 'pv:total'],
    ['SCARD', 'uv:total'],
    ['LRANGE', 'recent', '0', '19'],
    ...days.map((d) => ['GET', `pv:day:${d}`]),
    ...days.map((d) => ['SCARD', `uv:day:${d}`]),
  ]

  const results = await kv(commands)

  const totalViews = Number(results[0] ?? 0)
  const totalVisitors = Number(results[1] ?? 0)
  const recentRaw = (results[2] as string[] | null) ?? []
  const recent = recentRaw
    .map((r) => {
      try {
        return JSON.parse(r)
      } catch {
        return null
      }
    })
    .filter(Boolean)
  const dailyViews = days.map((d, i) => ({
    date: d,
    views: Number(results[3 + i] ?? 0),
    visitors: Number(results[3 + days.length + i] ?? 0),
  }))

  return res.status(200).json({ configured: true, totalViews, totalVisitors, recent, dailyViews })
}
