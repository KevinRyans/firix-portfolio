import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { cn } from '../../lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Diskret innfasing ved scroll. Bevisst liten: de store bevegelsene på siden
 * er stabelen i hero og prosjektene som vippes på plass, og denne skal ikke
 * konkurrere med dem. Respekterer «reduser bevegelse».
 */
export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Scroll-koblet innfasing: elementet skalerer og løftes i takt med hvor langt
 * det har kommet inn i viewporten, ikke bare når det passerer en terskel.
 * Dette er forskjellen på «noe toner inn» og «noe kommer mot deg».
 */
export function ScrollScale({
  children,
  className,
  from = 0.94,
  lift = 48,
  tilt = 0,
}: {
  children: ReactNode
  className?: string
  /** Startskala. Nærmere 1 = mer diskret. */
  from?: number
  /** Hvor mange piksler elementet løftes underveis. */
  lift?: number
  /** Grader elementet vippes bakover fra start, som en skjerm som reises opp. */
  tilt?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'center 0.55'],
  })

  // Fjæren tar bort rykkingen som følger av rå scrollverdier.
  const eased = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.6 })
  const scale = useTransform(eased, [0, 1], [from, 1])
  const y = useTransform(eased, [0, 1], [lift, 0])
  const opacity = useTransform(eased, [0, 0.6], [0, 1])
  const rotateX = useTransform(eased, [0, 1], [tilt, 0])

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <div ref={ref} className={className} style={tilt ? { perspective: 1400 } : undefined}>
      <motion.div style={{ scale, y, opacity, rotateX, transformOrigin: '50% 100%' }}>
        {children}
      </motion.div>
    </div>
  )
}

/**
 * Lett parallakse. Flytter innholdet saktere enn siden scroller, som gir
 * dybde uten at noe hopper.
 */
export function Parallax({
  children,
  className,
  distance = 40,
}: {
  children: ReactNode
  className?: string
  distance?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  )
}
