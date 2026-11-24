import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import Reveal from './Reveal'

export type Tone = 'light' | 'muted' | 'dark' | 'ink'

/** Antall ark i tegningssettet, altså seksjoner på forsiden. */
export const SHEETS = 7

/**
 * Seksjonstittel, satt som toppen av et ark i et tegningssett: en kraftig
 * linje, tittelen, og arknummeret i hjørnet. Arknummeret er navigasjon —
 * det samme nummeret står i tegningshodet øverst på siden.
 */
export function SectionHeading({
  sheet,
  title,
  lead,
  className,
}: {
  sheet?: number
  title: string
  lead?: string
  className?: string
}) {
  return (
    <Reveal className={cn('border-t-[1.5px] border-rule pt-6', className)}>
      <div className="flex items-start justify-between gap-6">
        {/* Tittelen kan inneholde linjeskift for kontrollert ombrekking. */}
        <h2 className="max-w-[18ch] text-balance whitespace-pre-line text-display text-fg">
          {title}
        </h2>
        {sheet ? (
          <p className="mt-2 shrink-0 text-[13px] font-medium tabular-nums text-accent">
            <span className="sr-only">Ark </span>
            {String(sheet).padStart(2, '0')} / {String(SHEETS).padStart(2, '0')}
          </p>
        ) : null}
      </div>
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
  paper = false,
  flush = false,
}: {
  id?: string
  children: ReactNode
  className?: string
  tone?: Tone
  /** Rutepapir i bakgrunnen. */
  paper?: boolean
  /** Dropper standard vertikal luft, for seksjoner som styrer den selv. */
  flush?: boolean
}) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={cn(
        'relative isolate scroll-mt-[var(--nav-height)] bg-ground text-fg',
        paper && 'grid-paper',
        !flush && 'py-20 sm:py-28',
        className,
      )}
    >
      <div className="shell relative">{children}</div>
    </section>
  )
}
