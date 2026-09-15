import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

type Variant = 'primary' | 'secondary' | 'quiet'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-1.5 rounded-full font-medium transition-all duration-300 ease-apple disabled:cursor-not-allowed disabled:opacity-45'

/**
 * Fargene leser tone-variablene, så knappene fungerer uendret på både lys og
 * mørk bakgrunn. `--accent` byttes til en lysere blåfarge på mørke seksjoner.
 */
const variants: Record<Variant, string> = {
  primary:
    'bg-accent-solid text-white hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
  secondary:
    'border border-hairline-strong bg-transparent text-fg hover:border-fg-faint hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
  quiet: 'text-accent underline-offset-4 decoration-1 hover:underline',
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
