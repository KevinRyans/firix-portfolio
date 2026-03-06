import { cn } from '../../lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

const baseStyles =
  'focus-ring inline-flex items-center justify-center gap-2 rounded-[4px] font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-60'

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent-400 font-mono text-[0.75rem] tracking-[0.06em] text-base-950 hover:-translate-y-0.5 hover:bg-accent-300',
  secondary:
    'border border-[#242434] font-mono text-[0.75rem] tracking-[0.06em] text-slate-100 hover:-translate-y-0.5 hover:border-accent-400 hover:text-accent-400',
  ghost:
    'font-mono text-[0.75rem] tracking-[0.05em] text-slate-400 hover:bg-white/5 hover:text-slate-100',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-1.5 text-xs',
  md: 'px-5 py-2',
  lg: 'px-6 py-2.5',
}

export function buttonStyles({
  variant = 'primary',
  size = 'md',
  className,
}: {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
} = {}) {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className)
}
