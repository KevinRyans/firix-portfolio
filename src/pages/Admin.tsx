import { useEffect, useRef, useState } from 'react'
import { Eye, EyeOff, LayoutDashboard, LogOut, Package, BarChart2, Save, RotateCcw, ExternalLink, TrendingUp, Users, Activity } from 'lucide-react'
import { isAuthenticated, login, logout } from '../lib/adminAuth'
import { getAdminStore, patchProject, resetProject, type AdminProjectOverride } from '../lib/adminStore'
import { cn } from '../lib/utils'
import { fetchGithubRepos, type GitHubRepo } from '../lib/github'
import { useProfile } from '../lib/i18n'

type Tab = 'overview' | 'projects' | 'analytics'

type AnalyticsData = {
  configured: boolean
  totalViews?: number
  totalVisitors?: number
  dailyViews?: { date: string; views: number; visitors: number }[]
  recent?: { path: string; visitorId: string; referrer: string; ts: number }[]
}

function StatCard({ label, value, Icon, sub }: { label: string; value: string | number; Icon: React.ElementType; sub?: string }) {
  return (
    <div className="rounded-[8px] border border-[#1c1c28] bg-[#0e0e18] p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-slate-500">{label}</p>
          <p className="mt-2 font-mono text-2xl font-bold text-white">{value}</p>
          {sub ? <p className="mt-1 font-mono text-[0.62rem] text-slate-600">{sub}</p> : null}
        </div>
        <div className="rounded-[6px] bg-[#7fffb2]/10 p-2 text-[#7fffb2]"><Icon size={16} /></div>
      </div>
    </div>
  )
}
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pass, setPass] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)
  const ref = useRef<HTMLInputElement>(null)
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (login(pass)) { onLogin() }
    else { setError(true); setShake(true); setTimeout(() => setShake(false), 600); setTimeout(() => setError(false), 2500); setPass(''); ref.current?.focus() }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#09090e] px-4">
      <div className={cn('w-full max-w-sm', shake && 'animate-[shake_0.5s_ease-in-out]')}>
        <div className="mb-8 text-center">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[#7fffb2]/60">Admin</p>
          <h1 className="mt-2 font-mono text-2xl font-bold tracking-tight text-white">FIRIX.NO</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input ref={ref} type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" autoFocus className={cn('w-full rounded-[6px] border bg-[#0e0e18] px-4 py-3 font-mono text-sm text-white outline-none transition-colors placeholder:text-slate-600', error ? 'border-rose-500/70 focus:border-rose-500' : 'border-[#1c1c28] focus:border-[#7fffb2]/50')} />
          {error ? <p className="font-mono text-xs text-rose-400">Incorrect password.</p> : null}
          <button type="submit" className="w-full rounded-[4px] bg-[#7fffb2] py-3 font-mono text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[#09090e] transition hover:bg-[#a8ffcb]">Sign in</button>
        </form>
      </div>
    </div>
  )
}

function Sidebar({ active, onChange, onLogout }: { active: Tab; onChange: (t: Tab) => void; onLogout: () => void }) {
  const items: { id: Tab; label: string; Icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', Icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', Icon: Package },
    { id: 'analytics', label: 'Analytics', Icon: BarChart2 },
  ]
  return (
    <aside className="flex h-screen w-52 flex-col border-r border-[#1c1c28] bg-[#0b0b14]">
      <div className="border-b border-[#1c1c28] px-5 py-5">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-[#7fffb2]/60">Admin Panel</p>
        <p className="mt-0.5 font-mono text-sm font-bold text-white">FIRIX.NO</p>
      </div>
      <nav className="flex-1 space-y-0.5 p-3">
        {items.map(({ id, label, Icon }) => (
          <button key={id} onClick={() => onChange(id)} className={cn('flex w-full items-center gap-3 rounded-[6px] px-3 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.08em] transition-colors', active === id ? 'bg-[#7fffb2]/10 text-[#7fffb2]' : 'text-slate-500 hover:bg-white/[0.03] hover:text-slate-300')}>
            <Icon size={14} />{label}
          </button>
        ))}
      </nav>
      <div className="border-t border-[#1c1c28] p-3">
        <button onClick={onLogout} className="flex w-full items-center gap-3 rounded-[6px] px-3 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-slate-600 transition-colors hover:bg-white/[0.03] hover:text-slate-400">
          <LogOut size={14} />Logout
        </button>
      </div>
    </aside>
  )
}
function OverviewTab({ repos }: { repos: GitHubRepo[] }) {
  const store = getAdminStore()
  const hidden = Object.values(store.projectOverrides).filter((o) => o.hidden).length
  const customized = Object.keys(store.projectOverrides).filter((k) => { const o = store.projectOverrides[k]; return o.displayName || o.description || o.demoUrl || o.tags }).length
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Overview</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total repos" value={repos.length} Icon={Package} />
          <StatCard label="Hidden" value={hidden} Icon={EyeOff} sub="repos hidden from site" />
          <StatCard label="Customized" value={customized} Icon={Save} sub="repos with overrides" />
          <StatCard label="Visible" value={Math.max(0, repos.length - hidden)} Icon={Eye} sub="showing on site" />
        </div>
      </div>
      <div>
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">GitHub repos</h2>
        <div className="mt-4 overflow-hidden rounded-[8px] border border-[#1c1c28]">
          {repos.slice(0, 10).map((repo, i) => {
            const override = store.projectOverrides[repo.name] ?? {}
            return (
              <div key={repo.name} className={cn('flex items-center justify-between px-4 py-3 text-sm', i > 0 && 'border-t border-[#1c1c28]')}>
                <span className={cn('font-mono text-[0.75rem]', override.hidden ? 'text-slate-600 line-through' : 'text-slate-300')}>{override.displayName ?? repo.name}</span>
                <div className="flex items-center gap-3">
                  {override.demoUrl ? <span className="font-mono text-[0.6rem] text-[#7fffb2]/60">demo</span> : null}
                  <span className={cn('font-mono text-[0.62rem] uppercase tracking-[0.08em]', override.hidden ? 'text-rose-500/70' : 'text-[#1c1c28]')}>{override.hidden ? 'hidden' : ''}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
function ProjectRow({ repo, override, onSave, onReset }: { repo: GitHubRepo; override: AdminProjectOverride; onSave: (patch: AdminProjectOverride) => void; onReset: () => void }) {
  const [expanded, setExpanded] = useState(false)
  const [draft, setDraft] = useState<AdminProjectOverride>({ ...override })
  const [saved, setSaved] = useState(false)
  const hasOverride = Object.keys(override).length > 0
  function handleSave() { onSave(draft); setSaved(true); setTimeout(() => setSaved(false), 1800) }
  return (
    <div className={cn('border-b border-[#1c1c28] last:border-0', draft.hidden && 'opacity-50')}>
      <div className="flex cursor-pointer items-center justify-between px-5 py-3.5 hover:bg-white/[0.02]" onClick={() => setExpanded((v) => !v)}>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.75rem] text-white">{draft.displayName ?? repo.name}</span>
          {hasOverride ? <span className="rounded-[3px] bg-[#7fffb2]/10 px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-[#7fffb2]">custom</span> : null}
          {draft.hidden ? <span className="rounded-[3px] bg-rose-500/10 px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-rose-400">hidden</span> : null}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.62rem] text-slate-700">{repo.language ?? ''}</span>
          <button onClick={(e) => { e.stopPropagation(); const next = !draft.hidden; setDraft((d) => ({ ...d, hidden: next })); onSave({ ...draft, hidden: next }) }} className={cn('rounded-[4px] border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.08em] transition-colors', draft.hidden ? 'border-rose-500/40 text-rose-400 hover:bg-rose-500/10' : 'border-[#1c1c28] text-slate-500 hover:border-[#7fffb2]/40 hover:text-[#7fffb2]')}>{draft.hidden ? 'Show' : 'Hide'}</button>
          <span className="text-slate-700">{expanded ? '▲' : '▼'}</span>
        </div>
      </div>
      {expanded ? (
        <div className="border-t border-[#1c1c28] bg-[#0b0b14] px-5 py-4 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-mono text-[0.6rem] uppercase tracking-[0.1em] text-slate-600">Display name</label>
              <input value={draft.displayName ?? ''} onChange={(e) => setDraft((d) => ({ ...d, displayName: e.target.value || undefined }))} placeholder={repo.name} className="w-full rounded-[4px] border border-[#1c1c28] bg-[#09090e] px-3 py-2 font-mono text-[0.75rem] text-white outline-none focus:border-[#7fffb2]/40" />
            </div>
            <div>
              <label className="mb-1 block font-mono text-[0.6rem] uppercase tracking-[0.1em] text-slate-600">Demo URL</label>
              <input value={draft.demoUrl ?? ''} onChange={(e) => setDraft((d) => ({ ...d, demoUrl: e.target.value || undefined }))} placeholder="https://..." className="w-full rounded-[4px] border border-[#1c1c28] bg-[#09090e] px-3 py-2 font-mono text-[0.75rem] text-white outline-none focus:border-[#7fffb2]/40" />
            </div>
          </div>
          <div>
            <label className="mb-1 block font-mono text-[0.6rem] uppercase tracking-[0.1em] text-slate-600">Description</label>
            <textarea value={draft.description ?? ''} onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value || undefined }))} placeholder={repo.description ?? ''} rows={2} className="w-full resize-none rounded-[4px] border border-[#1c1c28] bg-[#09090e] px-3 py-2 font-mono text-[0.75rem] text-white outline-none focus:border-[#7fffb2]/40" />
          </div>
          <div>
            <label className="mb-1 block font-mono text-[0.6rem] uppercase tracking-[0.1em] text-slate-600">Tags (comma-separated)</label>
            <input value={(draft.tags ?? []).join(', ')} onChange={(e) => setDraft((d) => ({ ...d, tags: e.target.value ? e.target.value.split(',').map((t) => t.trim()).filter(Boolean) : undefined }))} placeholder="React, TypeScript, ..." className="w-full rounded-[4px] border border-[#1c1c28] bg-[#09090e] px-3 py-2 font-mono text-[0.75rem] text-white outline-none focus:border-[#7fffb2]/40" />
          </div>
          <div className="flex items-center gap-3 pt-1">
            <button onClick={handleSave} className={cn('flex items-center gap-2 rounded-[4px] px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.08em] transition-all', saved ? 'bg-[#7fffb2]/20 text-[#7fffb2]' : 'bg-[#7fffb2] text-[#09090e] hover:bg-[#a8ffcb]')}><Save size={12} />{saved ? 'Saved' : 'Save'}</button>
            {hasOverride ? <button onClick={() => { onReset(); setDraft({}) }} className="flex items-center gap-2 rounded-[4px] border border-[#1c1c28] px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-slate-500 transition-colors hover:border-rose-500/40 hover:text-rose-400"><RotateCcw size={12} />Reset</button> : null}
            {draft.demoUrl ? <a href={draft.demoUrl} target="_blank" rel="noreferrer" className="ml-auto flex items-center gap-1 font-mono text-[0.65rem] text-slate-500 hover:text-[#7fffb2]"><ExternalLink size={11} />Preview demo</a> : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}

function ProjectsTab({ repos }: { repos: GitHubRepo[] }) {
  const [, forceUpdate] = useState(0)
  const [search, setSearch] = useState('')
  const store = getAdminStore()
  const filtered = repos.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Project overrides</h2>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search repos..." className="rounded-[4px] border border-[#1c1c28] bg-[#0e0e18] px-3 py-1.5 font-mono text-[0.72rem] text-white outline-none focus:border-[#7fffb2]/40 placeholder:text-slate-700" />
      </div>
      <p className="font-mono text-[0.65rem] text-slate-600">Changes save to localStorage and reflect on the site without a redeploy.</p>
      <div className="overflow-hidden rounded-[8px] border border-[#1c1c28]">
        {filtered.length === 0 ? <p className="px-5 py-6 font-mono text-[0.72rem] text-slate-600">No repos found.</p> : null}
        {filtered.map((repo) => (
          <ProjectRow key={repo.name} repo={repo} override={store.projectOverrides[repo.name] ?? {}} onSave={(patch) => { patchProject(repo.name, patch); forceUpdate((n) => n + 1) }} onReset={() => { resetProject(repo.name); forceUpdate((n) => n + 1) }} />
        ))}
      </div>
    </div>
  )
}
function AnalyticsTab() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const password = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined
  useEffect(() => {
    if (!password) { setLoading(false); return }
    fetch('/api/analytics', { headers: { 'x-admin-token': password } })
      .then((r) => r.json()).then((d) => setData(d as AnalyticsData)).catch(() => setData(null)).finally(() => setLoading(false))
  }, [password])
  if (loading) return <p className="font-mono text-[0.72rem] text-slate-600">Loading...</p>
  if (!data?.configured) {
    return (
      <div className="space-y-6">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Analytics</h2>
        <div className="rounded-[8px] border border-[#1c1c28] bg-[#0e0e18] p-6 space-y-4">
          <p className="font-mono text-sm font-semibold text-white">Analytics not configured</p>
          <p className="font-mono text-[0.72rem] leading-relaxed text-slate-500">Connect a Vercel KV store to this project to enable visitor tracking. No cookies or third-party scripts.</p>
          <ol className="space-y-1.5 font-mono text-[0.72rem] text-slate-500">
            <li>1. <span className="text-[#7fffb2]">vercel.com → Storage → Create KV Store</span></li>
            <li>2. Link the KV store to this project</li>
            <li>3. Redeploy — tracking starts automatically</li>
          </ol>
        </div>
      </div>
    )
  }
  const maxViews = Math.max(...(data.dailyViews?.map((d) => d.views) ?? [1]), 1)
  return (
    <div className="space-y-6">
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Analytics</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total page views" value={data.totalViews ?? 0} Icon={TrendingUp} />
        <StatCard label="Unique visitors" value={data.totalVisitors ?? 0} Icon={Users} sub="unique visitor IDs" />
        <StatCard label="Today" value={data.dailyViews?.[data.dailyViews.length - 1]?.views ?? 0} Icon={Activity} sub="page views today" />
      </div>
      <div className="rounded-[8px] border border-[#1c1c28] bg-[#0e0e18] p-5">
        <p className="mb-4 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-slate-500">Views — last 7 days</p>
        <div className="flex h-28 items-end gap-1">
          {data.dailyViews?.map((d) => (
            <div key={d.date} className="flex flex-1 flex-col items-center gap-1">
              <div className="w-full rounded-t-[2px] bg-[#7fffb2]/30 transition-all hover:bg-[#7fffb2]/50" style={{ height: Math.max(4, (d.views / maxViews) * 96) + 'px' }} title={d.views + ' views'} />
              <p className="font-mono text-[0.5rem] text-slate-700">{d.date.slice(5)}</p>
            </div>
          ))}
        </div>
      </div>
      {data.recent && data.recent.length > 0 ? (
        <div className="overflow-hidden rounded-[8px] border border-[#1c1c28]">
          <div className="border-b border-[#1c1c28] bg-[#0e0e18] px-5 py-3">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-slate-500">Recent activity</p>
          </div>
          {data.recent.slice(0, 10).map((item, i) => (
            <div key={i} className={cn('flex items-center justify-between px-5 py-2.5', i > 0 && 'border-t border-[#1c1c28]')}>
              <span className="font-mono text-[0.72rem] text-slate-400">{item.path}</span>
              <span className="font-mono text-[0.6rem] text-slate-700">{new Date(item.ts).toLocaleString()}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>('overview')
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const profile = useProfile()
  useEffect(() => {
    fetchGithubRepos(profile.githubUsername).then(setRepos).catch(() => setRepos([]))
  }, [profile.githubUsername])
  return (
    <div className="flex h-screen bg-[#09090e] text-slate-100">
      <Sidebar active={tab} onChange={setTab} onLogout={() => { logout(); onLogout() }} />
      <main className="flex-1 overflow-y-auto p-8">
        {tab === 'overview' && <OverviewTab repos={repos} />}
        {tab === 'projects' && <ProjectsTab repos={repos} />}
        {tab === 'analytics' && <AnalyticsTab />}
      </main>
    </div>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(isAuthenticated())
  return authed ? <AdminPanel onLogout={() => setAuthed(false)} /> : <LoginScreen onLogin={() => setAuthed(true)} />
}
