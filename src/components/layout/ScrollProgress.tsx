import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20 })

  if (shouldReduceMotion) return null

  return (
    <motion.div
      className="no-print fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-gradient-to-r from-accent-500 via-teal-400 to-accent-300"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}
