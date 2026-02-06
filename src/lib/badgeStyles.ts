export function getStatusTone(status?: string): 'default' | 'warning' | 'success' {
  if (!status) return 'default'
  const normalized = status.toLowerCase()
  if (normalized.includes('progress') || normalized.includes('pagar') || normalized.includes('pågår')) {
    return 'warning'
  }
  if (
    normalized.includes('complete') ||
    normalized.includes('done') ||
    normalized.includes('fullfort') ||
    normalized.includes('fullført') ||
    normalized.includes('ferdig')
  ) {
    return 'success'
  }
  return 'default'
}

const tagColors: Record<string, string> = {
  react: 'bg-sky-500/20 text-sky-200 border-sky-400/40',
  vite: 'bg-sky-500/20 text-sky-200 border-sky-400/40',
  tailwind: 'bg-teal-500/20 text-teal-200 border-teal-300/40',
  tailwindcss: 'bg-teal-500/20 text-teal-200 border-teal-300/40',
  typescript: 'bg-blue-600/20 text-blue-200 border-blue-400/40',
  javascript: 'bg-amber-400/20 text-amber-200 border-amber-300/40',
  node: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
  nodejs: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
  express: 'bg-slate-500/20 text-slate-200 border-slate-300/40',
  fastify: 'bg-orange-500/20 text-orange-200 border-orange-300/40',
  postgresql: 'bg-cyan-500/20 text-cyan-200 border-cyan-300/40',
  postgres: 'bg-cyan-500/20 text-cyan-200 border-cyan-300/40',
  socketio: 'bg-slate-400/20 text-slate-200 border-slate-300/40',
  docker: 'bg-sky-600/20 text-sky-200 border-sky-400/40',
  graphql: 'bg-rose-500/20 text-rose-200 border-rose-300/40',
  vercel: 'bg-slate-500/20 text-slate-100 border-slate-300/40',
  cloudflare: 'bg-amber-500/20 text-amber-200 border-amber-300/40',
  figma: 'bg-rose-500/20 text-rose-200 border-rose-300/40',
  fullstack: 'bg-teal-500/20 text-teal-200 border-teal-300/40',
  frontend: 'bg-sky-500/20 text-sky-200 border-sky-400/40',
  backend: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
  'google-sheets': 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
  googlesheets: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
  sheetjs: 'bg-amber-500/20 text-amber-200 border-amber-300/40',
  uiux: 'bg-cyan-500/20 text-cyan-200 border-cyan-300/40',
}

function normalizeTag(tag: string) {
  return tag
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9.+#]/g, '')
}

export function getTagBadgeClass(tag: string) {
  const key = normalizeTag(tag)
  return tagColors[key] ?? ''
}
