import type { VercelRequest, VercelResponse } from '@vercel/node'
import { bearer, verifyToken } from './_auth.js'
import { KV_TOKEN, KV_URL } from './_kv.js'

/**
 * Prosjektlisten som vises på firix.no.
 *
 * GET  — offentlig. Returnerer kun synlige prosjekter, sortert.
 * PUT  — krever admin-token. Erstatter hele listen.
 *
 * Lagres i Vercel KV (Upstash Redis REST). Er KV ikke satt opp, svarer GET
 * med `configured: false` og klienten faller tilbake til listen i
 * src/content/projects.ts.
 */

const KEY = 'firix:projects:v1'

type StoredProject = Record<string, unknown> & { id?: unknown; visible?: unknown; order?: unknown }

async function kvGet(): Promise<StoredProject[] | null> {
  if (!KV_URL || !KV_TOKEN) return null
  const res = await fetch(`${KV_URL}/get/${KEY}`, {
    headers: { Authorization: `Bearer ${KV_TOKEN}` },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`KV GET feilet: ${res.status}`)
  const json = (await res.json()) as { result: string | null }
  if (!json.result) return null
  try {
    const parsed = JSON.parse(json.result)
    return Array.isArray(parsed) ? (parsed as StoredProject[]) : null
  } catch {
    return null
  }
}

async function kvSet(projects: StoredProject[]): Promise<void> {
  if (!KV_URL || !KV_TOKEN) throw new Error('KV er ikke konfigurert')
  const res = await fetch(`${KV_URL}/set/${KEY}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(projects),
  })
  if (!res.ok) throw new Error(`KV SET feilet: ${res.status}`)
}

/**
 * Prosjekter kommer fra admin-panelet, men et API som stoler blindt på input
 * er et API som serverer søppel til kundene dine. Vi tvinger typene.
 */
function sanitize(input: unknown): StoredProject[] {
  if (!Array.isArray(input)) throw new Error('Forventet en liste med prosjekter')
  if (input.length > 100) throw new Error('For mange prosjekter (maks 100)')

  const str = (value: unknown, max = 4000) => (typeof value === 'string' ? value.slice(0, max) : '')
  const strList = (value: unknown, max = 30) =>
    Array.isArray(value)
      ? value
          .filter((v) => typeof v === 'string')
          .slice(0, max)
          .map((v) => str(v, 120))
      : []

  return input.map((raw, index) => {
    const item = (raw ?? {}) as Record<string, unknown>
    const id = str(item.id, 80) || `prosjekt-${index}`
    return {
      id,
      slug: str(item.slug, 80) || id,
      name: str(item.name, 120),
      client: str(item.client, 120),
      summary: str(item.summary, 400),
      description: str(item.description, 8000),
      url: str(item.url, 500),
      repoUrl: str(item.repoUrl, 500),
      previewMode:
        item.previewMode === 'live' || item.previewMode === 'image' ? item.previewMode : 'auto',
      previewUrl: str(item.previewUrl, 500),
      posterImage: str(item.posterImage, 500),
      tags: strList(item.tags, 12),
      year: str(item.year, 12),
      services: strList(item.services, 12),
      results: Array.isArray(item.results)
        ? item.results.slice(0, 8).map((r) => {
            const entry = (r ?? {}) as Record<string, unknown>
            return { label: str(entry.label, 80), value: str(entry.value, 40) }
          })
        : [],
      visible: item.visible !== false,
      featured: item.featured === true,
      order: typeof item.order === 'number' && Number.isFinite(item.order) ? item.order : index,
    }
  })
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    // Admin trenger å se skjulte prosjekter for å kunne slå dem på igjen.
    const isAdmin = verifyToken(bearer(req.headers.authorization))
    try {
      const stored = await kvGet()
      if (stored === null) {
        return res.status(200).json({ configured: Boolean(KV_URL && KV_TOKEN), projects: null })
      }
      const projects = (isAdmin ? stored : stored.filter((p) => p.visible !== false)).sort(
        (a, b) => Number(a.order ?? 0) - Number(b.order ?? 0),
      )
      res.setHeader(
        'Cache-Control',
        isAdmin ? 'no-store' : 'public, s-maxage=60, stale-while-revalidate=600',
      )
      return res.status(200).json({ configured: true, projects })
    } catch (error) {
      console.error('projects GET', error)
      return res.status(200).json({ configured: true, projects: null, error: 'kv_unavailable' })
    }
  }

  if (req.method === 'PUT') {
    if (!verifyToken(bearer(req.headers.authorization))) {
      return res.status(401).json({ error: 'Ikke autorisert.' })
    }
    if (!KV_URL || !KV_TOKEN) {
      return res.status(503).json({ error: 'Vercel KV er ikke koblet til prosjektet.' })
    }
    try {
      const projects = sanitize(req.body?.projects)
      await kvSet(projects)
      return res.status(200).json({ ok: true, count: projects.length })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Ukjent feil'
      console.error('projects PUT', error)
      return res.status(400).json({ error: message })
    }
  }

  res.setHeader('Allow', 'GET, PUT')
  return res.status(405).json({ error: 'Method not allowed' })
}
