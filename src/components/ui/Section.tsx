import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import Reveal from './Reveal'

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
        <p className="mb-3 text-eyebrow font-semibold uppercase tracking-[0.08em] text-brand-500">
          {eyebrow}
        </p>
      ) : null}
      {/* Tittelen kan inneholde linjeskift for kontrollert ombrekking. */}
      <h2 className="text-balance whitespace-pre-line text-display font-semibold text-ink">
        {title}
      </h2>
      {lead ? <p className="mt-5 text-lead text-ink-faint">{lead}</p> : null}
    </Reveal>
  )
}

export function Section({
  id,
  children,
  className,
  tone = 'canvas',
}: {
  id?: string
  children: ReactNode
  className?: string
  tone?: 'canvas' | 'muted' | 'ink'
}) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-[var(--nav-height)] py-20 sm:py-28',
        tone === 'muted' && 'bg-muted',
        tone === 'ink' && 'bg-ink text-white',
        className,
      )}
    >
      <div className="shell">{children}</div>
    </section>
  )
}
