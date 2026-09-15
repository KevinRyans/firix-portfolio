import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import Reveal from './Reveal'

export type Tone = 'light' | 'muted' | 'dark'

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  className,
}: {
  eyebrow?: string
  title: string
  lead?: string
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <Reveal className={cn('max-w-narrow', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <p className="mb-3 text-eyebrow font-semibold uppercase tracking-[0.08em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      {/* Tittelen kan inneholde linjeskift for kontrollert ombrekking. */}
      <h2 className="text-balance whitespace-pre-line text-display font-semibold text-fg">
        {title}
      </h2>
      {lead ? <p className="mt-5 text-lead text-fg-faint">{lead}</p> : null}
    </Reveal>
  )
}

/**
 * Fullbredde-seksjon som setter sin egen tone.
 *
 * Mørke seksjoner får to store, langsomt drivende gløder. De er det som
 * skiller en svart flate fra en svart flate som lever — og de koster ingenting
 * i ytelse, siden bare `transform` animeres.
 */
export function Section({
  id,
  children,
  className,
  tone = 'light',
  flush = false,
}: {
  id?: string
  children: ReactNode
  className?: string
  tone?: Tone
  /** Dropper standard vertikal luft, for seksjoner som styrer den selv. */
  flush?: boolean
}) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={cn(
        'relative isolate scroll-mt-[var(--nav-height)] bg-ground text-fg',
        !flush && 'py-20 sm:py-28',
        className,
      )}
    >
      {tone === 'dark' ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-[10%] top-[-20%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(41,151,255,0.18),transparent_68%)] animate-drift blur-2xl motion-reduce:animate-none" />
          <div
            className="absolute -right-[12%] bottom-[-25%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(120,80,255,0.14),transparent_68%)] animate-drift blur-2xl motion-reduce:animate-none"
            style={{ animationDelay: '-7s' }}
          />
        </div>
      ) : null}
      <div className="shell relative">{children}</div>
    </section>
  )
}
