import { motion, useReducedMotion } from 'framer-motion'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: 'easeIn' } },
      }}
      initial={shouldReduceMotion ? false : 'initial'}
      animate='animate'
      exit={shouldReduceMotion ? { opacity: 0 } : 'exit'}
    >
      {children}
    </motion.div>
  )
}
