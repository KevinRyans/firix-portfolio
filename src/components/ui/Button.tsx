import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

type Variant = 'primary' | 'secondary' | 'quiet'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-[2px] font-semibold tracking-[-0.01em] transition duration-300 ease-apple disabled:cursor-not-allowed disabled:opacity-45'

/**
 * Primærknappen er strekblå med hvit tekst (6.7:1) på papir, og hvit med blå
 * tekst på blåkopi. Sekundær er en kontur i tonens tekstfarge. Rette hjørner:
 * det er en tegning, ikke en app.
 */
const variants: Record<Variant, string> = {
  primary:
    'bg-accent-solid text-accent-on hover:-translate-y-px hover:shadow-[3px_3px_0_var(--fg)] active:translate-y-0 active:shadow-none',
  secondary:
    'border-[1.5px] border-fg text-fg hover:-translate-y-px hover:shadow-[3px_3px_0_var(--fg)] active:translate-y-0 active:shadow-none',
  quiet: 'text-accent underline decoration-1 underline-offset-4 hover:decoration-2',
}

const sizes: Record<Size, string> = {
  md: 'px-5 py-3 text-[15px]',
  lg: 'px-6 py-4 text-[17px]',
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
