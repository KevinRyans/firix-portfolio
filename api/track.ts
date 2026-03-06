import type { VercelRequest, VercelResponse } from '@vercel/node'

const KV_URL = process.env.KV_REST_API_URL
const KV_TOKEN = process.env.KV_REST_API_TOKEN

async function kvPipeline(commands: unknown[][]): Promise<void> {
  if (!KV_URL || !KV_TOKEN) return
  await fetch(`${KV_URL}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
  })
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method !== 'POST') return res.status(405).end()

  const { path, visitorId, referrer } = req.body as {
    path?: string
    visitorId?: string
    referrer?: string
  }

  if (!path) return res.status(400).end()

  const now = Date.now()
  const day = new Date().toISOString().slice(0, 10)
  const safeKey = (s: string) => s.replace(/[^a-zA-Z0-9/_-]/g, '_').slice(0, 120)
  const pathKey = safeKey(path)

  await kvPipeline([
    ['INCR', `pv:total`],
    ['INCR', `pv:day:${day}`],
    ['INCR', `pv:path:${pathKey}`],
    ['SADD', `uv:day:${day}`, visitorId ?? 'unknown'],
    ['SADD', `uv:total`, visitorId ?? 'unknown'],
    ['LPUSH', 'recent', JSON.stringify({ path, visitorId, referrer, ts: now })],
    ['LTRIM', 'recent', '0', '99'],
  ])

  return res.status(200).json({ ok: true })
}
