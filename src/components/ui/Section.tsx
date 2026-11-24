import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import Reveal from './Reveal'

export type Tone = 'light' | 'muted' | 'dark' | 'ink'

/**
 * Seksjonstittel. Ingen etikett over tittelen: tittelen sier selv hva
 * seksjonen handler om, og navigasjonen bruker de samme ordene.
 */
export function SectionHeading({
  title,
  lead,
  align = 'left',
  className,
}: {
  title: string
  lead?: string
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <Reveal className={cn('max-w-narrow', align === 'center' && 'mx-auto text-center', className)}>
      {/* Tittelen kan inneholde linjeskift for kontrollert ombrekking. */}
      <h2 className="text-balance whitespace-pre-line text-display text-fg">{title}</h2>
      {lead ? <p className="mt-5 max-w-prose text-lead text-fg-faint">{lead}</p> : null}
    </Reveal>
  )
}

/** Fullbredde-seksjon som setter sin egen tone. */
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
      <div className="shell relative">{children}</div>
    </section>
  )
}
