import { useCallback, useEffect, useRef, useState } from 'react'
import type { CuratedProject } from '../../content/projects'
import { cn, prettyHost } from '../../lib/utils'
import BrowserFrame from '../ui/BrowserFrame'

/** Bredden nettstedet gjengis i før nedskalering. Gir desktop-layout i kortet. */
const RENDER_WIDTH = 1440
/** Høyde-forhold på previewen. 16:10 viser mer av forsiden enn 16:9. */
const ASPECT = 10 / 16
/** Gir vi opp på en live-preview etter dette, viser vi fallback i stedet. */
const LOAD_TIMEOUT_MS = 9000

type Status = 'idle' | 'loading' | 'loaded' | 'failed'

function Placeholder({ host }: { host: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-muted via-surface to-brand-50 p-6 text-center">
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-ink-ghost" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.93 9h-2.95a15.6 15.6 0 0 0-1.2-5.42A8.03 8.03 0 0 1 18.93 11ZM12 4.04c.83 1.2 1.68 3.3 1.94 6.96h-3.88C10.32 7.34 11.17 5.24 12 4.04ZM4.26 13h2.95c.14 2.1.56 3.93 1.2 5.42A8.03 8.03 0 0 1 4.26 13Zm2.95-2H4.26a8.03 8.03 0 0 1 4.15-5.42A15.6 15.6 0 0 0 7.21 11ZM12 19.96c-.83-1.2-1.68-3.3-1.94-6.96h3.88c-.26 3.66-1.11 5.76-1.94 6.96Zm2.78-1.54c.64-1.49 1.06-3.32 1.2-5.42h2.95a8.03 8.03 0 0 1-4.15 5.42Z"
        />
      </svg>
      <p className="text-sm font-medium text-ink-faint">{host}</p>
    </div>
  )
}

/**
 * Viser det ekte nettstedet i en nedskalert iframe.
 *
 * Tre ting gjør dette trygt å ha på en salgsside:
 *  1. Iframen monteres først når kortet nærmer seg viewporten, så seks
 *     previews ikke laster seks nettsteder ved sidelast.
 *  2. Den er `pointer-events: none` til brukeren aktivt trykker «Utforsk» —
 *     ellers spiser iframen scrollingen på mobil.
 *  3. Plakatbildet ligger under og blir stående hvis nettstedet nekter å bli
 *     embeddet (X-Frame-Options / CSP frame-ancestors) eller bruker for lang tid.
 */
export default function LivePreview({
  project,
  className,
  interactive = true,
  compact = false,
  priority = false,
}: {
  project: CuratedProject
  className?: string
  /** Sett false på kort som kun skal være klikkbare lenker. */
  interactive?: boolean
  compact?: boolean
  /** Hopper over lazy-loading for den første, synlige previewen. */
  priority?: boolean
}) {
  const target = project.previewUrl || project.url
  const host = target ? prettyHost(target) : project.name
  const wantsLive = project.previewMode === 'live' && Boolean(target)

  const containerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<number | undefined>(undefined)
  // Mangler nettleseren IntersectionObserver, hopper vi rett til synlig
  // i stedet for å sette state fra en effekt.
  const startVisible = priority || typeof IntersectionObserver === 'undefined'
  const [visible, setVisible] = useState(startVisible)
  const [scale, setScale] = useState(0.25)
  const [status, setStatus] = useState<Status>(() =>
    startVisible && wantsLive ? 'loading' : 'idle',
  )
  const [live, setLive] = useState(false)

  // Monter iframen først når kortet er i nærheten av skjermen.
  useEffect(() => {
    if (!wantsLive || visible) return
    const node = containerRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          setStatus('loading')
          observer.disconnect()
        }
      },
      { rootMargin: '400px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [wantsLive, visible])

  // Skaler 1440px-gjengivelsen ned til kortets faktiske bredde.
  useEffect(() => {
    const node = containerRef.current
    if (!node) return
    const measure = () => setScale(node.clientWidth / RENDER_WIDTH)
    measure()
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure)
      return () => window.removeEventListener('resize', measure)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Blokkert innhold gir ikke alltid en `error`-hendelse, så vi tar tiden.
  useEffect(() => {
    if (!visible || !wantsLive) return
    timerRef.current = window.setTimeout(() => {
      setStatus((prev) => (prev === 'loaded' ? prev : 'failed'))
    }, LOAD_TIMEOUT_MS)
    return () => window.clearTimeout(timerRef.current)
  }, [visible, wantsLive])

  const handleLoad = useCallback(() => {
    window.clearTimeout(timerRef.current)
    setStatus('loaded')
  }, [])

  const handleError = useCallback(() => {
    window.clearTimeout(timerRef.current)
    setStatus('failed')
  }, [])

  const showFrame = wantsLive && visible && status !== 'failed'

  return (
    <BrowserFrame host={host} className={className} compact={compact}>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden bg-muted"
        style={{ aspectRatio: `${1 / ASPECT}` }}
      >
        {/* Basislag: plakatbilde hvis det finnes, ellers en nøytral flate. */}
        {project.posterImage ? (
          <img
            src={project.posterImage}
            alt={`Forsiden til ${project.name}`}
            loading={priority ? 'eager' : 'lazy'}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0">
            <Placeholder host={host} />
          </div>
        )}

        {showFrame ? (
          <iframe
            src={target}
            title={`Live forhåndsvisning av ${project.name}`}
            loading={priority ? 'eager' : 'lazy'}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            onLoad={handleLoad}
            onError={handleError}
            tabIndex={live ? 0 : -1}
            aria-hidden={live ? undefined : true}
            className={cn(
              'absolute left-0 top-0 origin-top-left border-0 transition-opacity duration-700 ease-apple',
              status === 'loaded' ? 'opacity-100' : 'opacity-0',
              live ? 'pointer-events-auto' : 'pointer-events-none',
            )}
            style={{
              width: RENDER_WIDTH,
              height: RENDER_WIDTH * ASPECT,
              transform: `scale(${scale})`,
            }}
          />
        ) : null}

        {/* Laster-indikator som ikke hopper i layouten. */}
        {showFrame && status === 'loading' && !project.posterImage ? (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted to-line-soft" />
        ) : null}

        {interactive ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/45 via-black/10 to-transparent p-3 opacity-0 transition-opacity duration-300 ease-apple group-hover:opacity-100 group-focus-within:opacity-100">
            {wantsLive && status === 'loaded' ? (
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  setLive((prev) => !prev)
                }}
                className="pointer-events-auto rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-ink shadow-sm backdrop-blur transition hover:bg-white"
              >
                {live ? 'Lås scrolling' : 'Utforsk i kortet'}
              </button>
            ) : (
              <span />
            )}
            {target ? (
              <a
                href={target}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="pointer-events-auto rounded-full bg-ink/85 px-3 py-1.5 text-xs font-medium text-white backdrop-blur transition hover:bg-ink"
              >
                Åpne nettstedet ↗
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </BrowserFrame>
  )
}
