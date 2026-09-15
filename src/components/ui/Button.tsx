import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

type Variant = 'primary' | 'secondary' | 'quiet'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-1.5 rounded-full font-medium transition-all duration-200 ease-apple disabled:cursor-not-allowed disabled:opacity-45'

const variants: Record<Variant, string> = {
  primary: 'bg-brand-500 text-white hover:bg-brand-600 active:scale-[0.98]',
  secondary: 'border border-line bg-surface text-ink hover:border-ink-ghost active:scale-[0.98]',
  quiet: 'text-brand-500 hover:underline underline-offset-4 decoration-1',
}

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-[15px]',
  lg: 'px-7 py-3.5 text-[17px]',
}

type Props = {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  to?: string
  href?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  to,
  href,
  type = 'button',
  onClick,
  disabled,
}: Props) {
  const classes = cn(base, variant === 'quiet' ? '' : sizes[size], variants[variant], className)

  // Ankerlenker (/#priser) må gå gjennom nettleseren for at scroll skal treffe.
  if (to && to.includes('#')) {
    return (
      <a href={to} className={classes}>
        {children}
      </a>
    )
  }
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
