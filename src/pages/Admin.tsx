import { useEffect, useMemo, useState } from 'react'
import { emptyProject, type CuratedProject } from '../content/projects'
import { checkPreview, clearToken, getToken, login, saveProjects } from '../lib/admin'
import { fetchProjects } from '../lib/projects'
import { cn, slugify } from '../lib/utils'
import LivePreview from '../components/projects/LivePreview'

const input =
  'w-full rounded-lg border border-line bg-surface px-3 py-2 text-[14px] text-ink outline-none transition-colors placeholder:text-ink-ghost focus:border-brand-500'
const label = 'mb-1 block text-[12px] font-medium text-ink-faint'

function Login({ onDone }: { onDone: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setBusy(true)
    setError('')
    const result = await login(password)
    setBusy(false)
    if (result.ok) onDone()
    else {
      setError(result.error)
      setPassword('')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-6">
      <form onSubmit={submit} className="w-full max-w-sm rounded-panel bg-surface p-8 shadow-card">
        <h1 className="text-title font-semibold text-ink">Firix admin</h1>
        <p className="mt-1.5 text-[13px] text-ink-faint">Logg inn for å styre prosjektene.</p>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Passord"
          className={cn(input, 'mt-6')}
        />
        {error ? <p className="mt-2 text-[13px] text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={busy || !password}
          className="mt-4 w-full rounded-full bg-brand-500 py-2.5 text-[15px] font-medium text-white transition hover:bg-brand-600 disabled:opacity-50"
        >
          {busy ? 'Logger inn …' : 'Logg inn'}
        </button>
      </form>
    </div>
  )
}

/** Én rad i listen. Bryteren her er «vises på firix.no». */
function Row({
  project,
  active,
  onSelect,
  onToggle,
  onMove,
  isFirst,
  isLast,
}: {
  project: CuratedProject
  active: boolean
  onSelect: () => void
  onToggle: () => void
  onMove: (direction: -1 | 1) => void
  isFirst: boolean
  isLast: boolean
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 border-b border-line-soft px-4 py-3 transition-colors',
        active ? 'bg-brand-50' : 'hover:bg-muted',
      )}
    >
      <div className="flex flex-col">
        <button
          type="button"
          onClick={() => onMove(-1)}
          disabled={isFirst}
          aria-label="Flytt opp"
          className="px-1 text-[10px] leading-none text-ink-ghost hover:text-ink disabled:opacity-25"
        >
          ▲
        </button>
        <button
          type="button"
          onClick={() => onMove(1)}
          disabled={isLast}
          aria-label="Flytt ned"
          className="px-1 text-[10px] leading-none text-ink-ghost hover:text-ink disabled:opacity-25"
        >
          ▼
        </button>
      </div>

      <button type="button" onClick={onSelect} className="min-w-0 flex-1 text-left">
        <p
          className={cn(
            'truncate text-[14px] font-medium',
            project.visible ? 'text-ink' : 'text-ink-ghost line-through',
          )}
        >
          {project.name || 'Uten navn'}
        </p>
        <p className="truncate text-[12px] text-ink-ghost">
          {project.featured ? '★ Fremhevet · ' : ''}
          {project.url || 'ingen lenke'}
        </p>
      </button>

      <button
        type="button"
        role="switch"
        aria-checked={project.visible}
        aria-label={`Vis ${project.name} på nettsiden`}
        onClick={onToggle}
        className={cn(
          'relative h-6 w-10 shrink-0 rounded-full transition-colors',
          project.visible ? 'bg-positive' : 'bg-line',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
            project.visible ? 'translate-x-[18px]' : 'translate-x-0.5',
          )}
        />
      </button>
    </div>
  )
}

function Editor({
  project,
  onChange,
  onDelete,
}: {
  project: CuratedProject
  onChange: (patch: Partial<CuratedProject>) => void
  onDelete: () => void
}) {
  const [checking, setChecking] = useState(false)
  const [check, setCheck] = useState<{ ok: boolean; text: string } | null>(null)

  const list = (value: string) =>
    value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <span className={label}>Navn</span>
          <input
            value={project.name}
            onChange={(e) => {
              const name = e.target.value
              // Slug følger navnet til man redigerer den manuelt.
              const autoSlug = !project.slug || project.slug === slugify(project.name)
              onChange(autoSlug ? { name, slug: slugify(name) } : { name })
            }}
            className={input}
          />
        </div>
        <div>
          <span className={label}>Kunde</span>
          <input
            value={project.client}
            onChange={(e) => onChange({ client: e.target.value })}
            className={input}
          />
        </div>
        <div>
          <span className={label}>URL til nettstedet</span>
          <input
            value={project.url}
            onChange={(e) => onChange({ url: e.target.value })}
            placeholder="https://..."
            className={input}
          />
        </div>
        <div>
          <span className={label}>Adresse på firix.no</span>
          <div className="flex items-center gap-1">
            <span className="text-[13px] text-ink-ghost">/prosjekter/</span>
            <input
              value={project.slug}
              onChange={(e) => onChange({ slug: slugify(e.target.value) })}
              className={input}
            />
          </div>
        </div>
        <div>
          <span className={label}>År</span>
          <input
            value={project.year}
            onChange={(e) => onChange({ year: e.target.value })}
            className={input}
          />
        </div>
        <div>
          <span className={label}>Kode-URL (valgfritt)</span>
          <input
            value={project.repoUrl}
            onChange={(e) => onChange({ repoUrl: e.target.value })}
            className={input}
          />
        </div>
      </div>

      <div>
        <span className={label}>Kort beskrivelse (vises på kortet)</span>
        <textarea
          rows={2}
          value={project.summary}
          onChange={(e) => onChange({ summary: e.target.value })}
          className={cn(input, 'resize-y')}
        />
      </div>

      <div>
        <span className={label}>Full beskrivelse (detaljsiden — blank linje gir nytt avsnitt)</span>
        <textarea
          rows={7}
          value={project.description}
          onChange={(e) => onChange({ description: e.target.value })}
          className={cn(input, 'resize-y leading-relaxed')}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <span className={label}>Stikkord (kommaseparert)</span>
          <input
            value={project.tags.join(', ')}
            onChange={(e) => onChange({ tags: list(e.target.value) })}
            className={input}
          />
        </div>
        <div>
          <span className={label}>Leveranse (kommaseparert)</span>
          <input
            value={project.services.join(', ')}
            onChange={(e) => onChange({ services: list(e.target.value) })}
            className={input}
          />
        </div>
      </div>

      <div className="rounded-xl border border-line-soft bg-muted p-4">
        <p className="text-[13px] font-medium text-ink">Forhåndsvisning</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {(['auto', 'image', 'live'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => onChange({ previewMode: mode })}
              className={cn(
                'rounded-full border px-3 py-1.5 text-[13px] transition',
                project.previewMode === mode
                  ? 'border-brand-500 bg-brand-500 text-white'
                  : 'border-line bg-surface text-ink-soft hover:border-ink-ghost',
              )}
            >
              {mode === 'auto'
                ? 'Automatisk skjermbilde'
                : mode === 'image'
                  ? 'Eget bilde'
                  : 'Live nettsted'}
            </button>
          ))}
        </div>
        <p className="mt-2 text-[12px] leading-relaxed text-ink-faint">
          <strong className="font-medium text-ink">Automatisk</strong> henter et skjermbilde av
          nettstedet og oppdaterer seg selv — virker uansett om nettstedet tillater innramming.{' '}
          <strong className="font-medium text-ink">Eget bilde</strong> gir best kvalitet: legg filen
          i <code className="text-ink">/public/previews/</code>.{' '}
          <strong className="font-medium text-ink">Live</strong> laster det ekte nettstedet, men
          mange nettsteder nekter innramming, og det kan ikke oppdages fra nettleseren — da ser
          besøkende nettleserens grå feilside. Sjekk før du velger den.
        </p>

        {project.url ? (
          <div className="mt-3">
            <button
              type="button"
              disabled={checking}
              onClick={async () => {
                setChecking(true)
                setCheck(null)
                const result = await checkPreview(project.url)
                setChecking(false)
                if ('error' in result) {
                  setCheck({ ok: false, text: result.error })
                  return
                }
                setCheck({ ok: result.embeddable, text: result.reason })
                // Blokkert nettsted skal ikke bli stående i live-modus.
                if (!result.embeddable && project.previewMode === 'live') {
                  onChange({ previewMode: 'image' })
                }
              }}
              className="rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] text-ink-soft transition hover:border-ink-ghost disabled:opacity-50"
            >
              {checking ? 'Sjekker …' : 'Kan nettstedet vises live?'}
            </button>
            {check ? (
              <p
                className={cn(
                  'mt-2 rounded-lg px-3 py-2 text-[12px] leading-relaxed',
                  check.ok ? 'bg-positive/10 text-positive' : 'bg-amber-50 text-amber-800',
                )}
              >
                {check.ok ? '✓ ' : '✗ '}
                {check.text}
              </p>
            ) : null}
          </div>
        ) : null}
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <span className={label}>Bilde-sti (også fallback)</span>
            <input
              value={project.posterImage}
              onChange={(e) => onChange({ posterImage: e.target.value })}
              placeholder="/previews/navn.jpg"
              className={input}
            />
          </div>
          <div>
            <span className={label}>Egen preview-URL (valgfritt)</span>
            <input
              value={project.previewUrl}
              onChange={(e) => onChange({ previewUrl: e.target.value })}
              placeholder="Tom = bruker URL-en over"
              className={input}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line-soft pt-5">
        <label className="flex items-center gap-2 text-[14px] text-ink-soft">
          <input
            type="checkbox"
            checked={project.featured}
            onChange={(e) => onChange({ featured: e.target.checked })}
            className="h-4 w-4 accent-brand-500"
          />
          Fremhev øverst med stor forhåndsvisning
        </label>
        <button
          type="button"
          onClick={onDelete}
          className="text-[13px] text-red-600 hover:underline"
        >
          Slett prosjektet
        </button>
      </div>

      {project.url || project.posterImage ? (
        <div>
          <p className={label}>Slik ser det ut</p>
          <LivePreview project={project} priority interactive={false} compact />
        </div>
      ) : null}
    </div>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => Boolean(getToken()))
  const [projects, setProjects] = useState<CuratedProject[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [dirty, setDirty] = useState(false)
  const [message, setMessage] = useState<{ tone: 'ok' | 'bad'; text: string } | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    document.title = 'Admin — Firix'
  }, [])

  // Henter listen når man er logget inn. All setState skjer i løftets
  // callback, ikke synkront i effekten.
  useEffect(() => {
    if (!authed) return
    let active = true

    void fetchProjects(getToken() ?? undefined).then(({ projects: loaded, isFallback }) => {
      if (!active) return
      setProjects(loaded)
      setSelectedId(loaded[0]?.id ?? null)
      setLoading(false)
      if (isFallback) {
        setMessage({
          tone: 'bad',
          text: 'Ingen lagret liste funnet — viser standardlisten fra koden. Trykk «Lagre» for å ta over styringen.',
        })
      }
    })

    return () => {
      active = false
    }
  }, [authed])

  // Advar før man mister ulagrede endringer.
  useEffect(() => {
    if (!dirty) return
    const handler = (event: BeforeUnloadEvent) => event.preventDefault()
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [dirty])

  const selected = useMemo(
    () => projects.find((project) => project.id === selectedId) ?? null,
    [projects, selectedId],
  )

  function update(id: string, patch: Partial<CuratedProject>) {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)))
    setDirty(true)
  }

  function move(index: number, direction: -1 | 1) {
    setProjects((prev) => {
      const next = [...prev]
      const target = index + direction
      if (target < 0 || target >= next.length) return prev
      ;[next[index], next[target]] = [next[target], next[index]]
      return next.map((project, i) => ({ ...project, order: i }))
    })
    setDirty(true)
  }

  function add() {
    const project = { ...emptyProject(`prosjekt-${Date.now()}`), order: projects.length }
    setProjects((prev) => [...prev, project])
    setSelectedId(project.id)
    setDirty(true)
  }

  function remove(id: string) {
    if (
      !window.confirm(
        'Slette dette prosjektet? Du må lagre for at det skal forsvinne fra nettsiden.',
      )
    )
      return
    setProjects((prev) => prev.filter((p) => p.id !== id))
    setSelectedId(null)
    setDirty(true)
  }

  async function save() {
    setSaving(true)
    setMessage(null)
    const ordered = projects.map((project, index) => ({ ...project, order: index }))
    const result = await saveProjects(ordered)
    setSaving(false)
    if (result.ok) {
      setProjects(ordered)
      setDirty(false)
      setMessage({ tone: 'ok', text: 'Lagret. Endringene er live på firix.no.' })
    } else {
      setMessage({ tone: 'bad', text: result.error })
      if (!getToken()) setAuthed(false)
    }
  }

  if (!authed) return <Login onDone={() => setAuthed(true)} />

  const visibleCount = projects.filter((p) => p.visible).length

  return (
    <div className="min-h-screen bg-muted">
      <header className="sticky top-0 z-20 border-b border-line-soft bg-canvas/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-6 py-3">
          <div>
            <p className="text-[15px] font-semibold text-ink">Firix admin</p>
            <p className="text-[12px] text-ink-ghost">
              {visibleCount} av {projects.length} prosjekter vises på nettsiden
            </p>
          </div>
          <div className="flex items-center gap-3">
            {dirty ? (
              <span className="text-[12px] font-medium text-amber-600">Ulagrede endringer</span>
            ) : null}
            <button
              type="button"
              onClick={add}
              className="rounded-full border border-line bg-surface px-4 py-2 text-[13px] font-medium text-ink transition hover:border-ink-ghost"
            >
              Nytt prosjekt
            </button>
            <button
              type="button"
              onClick={save}
              disabled={saving || !dirty}
              className="rounded-full bg-brand-500 px-5 py-2 text-[13px] font-medium text-white transition hover:bg-brand-600 disabled:opacity-40"
            >
              {saving ? 'Lagrer …' : 'Lagre'}
            </button>
            <button
              type="button"
              onClick={() => {
                clearToken()
                setAuthed(false)
              }}
              className="text-[13px] text-ink-faint hover:text-ink"
            >
              Logg ut
            </button>
          </div>
        </div>
      </header>

      {message ? (
        <div className="mx-auto max-w-[1280px] px-6 pt-4">
          <p
            className={cn(
              'rounded-xl px-4 py-3 text-[13px]',
              message.tone === 'ok' ? 'bg-positive/10 text-positive' : 'bg-amber-50 text-amber-800',
            )}
          >
            {message.text}
          </p>
        </div>
      ) : null}

      <div className="mx-auto grid max-w-[1280px] gap-6 px-6 py-6 lg:grid-cols-[340px_1fr]">
        <aside className="h-fit overflow-hidden rounded-panel border border-line-soft bg-surface">
          {loading ? (
            <p className="p-6 text-[13px] text-ink-faint">Laster …</p>
          ) : projects.length === 0 ? (
            <p className="p-6 text-[13px] text-ink-faint">
              Ingen prosjekter ennå. Trykk «Nytt prosjekt».
            </p>
          ) : (
            projects.map((project, index) => (
              <Row
                key={project.id}
                project={project}
                active={project.id === selectedId}
                isFirst={index === 0}
                isLast={index === projects.length - 1}
                onSelect={() => setSelectedId(project.id)}
                onToggle={() => update(project.id, { visible: !project.visible })}
                onMove={(direction) => move(index, direction)}
              />
            ))
          )}
        </aside>

        <main className="rounded-panel border border-line-soft bg-surface p-6 sm:p-8">
          {selected ? (
            <Editor
              key={selected.id}
              project={selected}
              onChange={(patch) => update(selected.id, patch)}
              onDelete={() => remove(selected.id)}
            />
          ) : (
            <p className="py-20 text-center text-[14px] text-ink-faint">
              Velg et prosjekt til venstre, eller opprett et nytt.
            </p>
          )}
        </main>
      </div>
    </div>
  )
}
