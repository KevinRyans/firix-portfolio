import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export type CardVariant = 'default' | 'glow'

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant
  interactive?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', interactive = false, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border border-[#1c1c28] bg-base-900 p-6 shadow-soft',
        variant === 'glow' && 'shadow-glow',
        interactive &&
          'transition-all duration-300 hover:-translate-y-[5px] hover:border-[#242434] hover:shadow-[0_20px_48px_rgba(0,0,0,0.45)]',
        className,
      )}
      {...props}
    />
  ),
)

Card.displayName = 'Card'

export default Card
