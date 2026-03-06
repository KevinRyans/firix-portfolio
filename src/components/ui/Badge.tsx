import { cn } from '../../lib/utils'

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: 'default' | 'accent' | 'warning' | 'success'
}

const toneStyles = {
  default: 'bg-white/5 text-slate-400 border-[#242434]',
  accent: 'bg-accent-400/10 text-accent-400 border-accent-400/25',
  warning: 'bg-amber-400/10 text-amber-300 border-amber-300/30',
  success: 'bg-emerald-500/10 text-emerald-300 border-emerald-400/30',
}

export default function Badge({ tone = 'default', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[4px] border px-[0.6rem] py-[0.2rem] text-[0.62rem] font-medium uppercase tracking-[0.1em] transition',
        toneStyles[tone],
        className,
      )}
      {...props}
    />
  )
}
