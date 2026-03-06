import { cn } from '../../lib/utils'

export type SectionHeaderProps = {
  title: string
  subtitle?: string
  eyebrow?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeader({
  title,
  subtitle,
  eyebrow,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'space-y-2',
        align === 'center' && 'text-center',
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-[0.63rem] font-mono uppercase tracking-[0.22em] text-accent-400">
          {'// '}{eyebrow}
        </p>
      ) : null}
      <h2
        className="font-display font-extrabold leading-tight text-white"
        style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)", letterSpacing: "-0.03em" }}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-[540px] text-[0.85rem] leading-relaxed text-slate-500">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
