import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/utils'

const blobBase =
  'absolute rounded-full blur-3xl opacity-60 mix-blend-screen will-change-transform'

export default function AnimatedBackground() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute inset-0 geo-grid opacity-45 animate-gridShift motion-reduce:animate-none" />
      <div className="absolute inset-0 geo-grid-soft opacity-30 animate-gridShift motion-reduce:animate-none" />
      <div className="absolute inset-0 opacity-60">
        <div className="absolute left-[10%] top-[16%] h-48 w-48 rounded-[26px] border border-accent-500/25 bg-accent-500/10 animate-spinSlower motion-reduce:animate-none" />
        <div className="absolute right-[12%] top-[28%] h-64 w-64 rounded-full border border-teal-400/25 bg-teal-400/10 animate-orbit motion-reduce:animate-none" />
        <div className="absolute bottom-[14%] left-[18%] h-28 w-28 rotate-12 rounded-2xl border border-white/20 bg-white/10 animate-drift motion-reduce:animate-none" />
        <div className="absolute bottom-[22%] right-[22%] h-32 w-32 rounded-[30%] border border-accent-300/25 bg-accent-300/10 animate-drift motion-reduce:animate-none" />
        <div className="absolute left-[45%] top-[10%] h-16 w-16 rotate-45 rounded-xl border border-teal-300/30 bg-teal-300/10 animate-spinSlower motion-reduce:animate-none" />
      </div>
      <motion.div
        className={cn(blobBase, 'left-[12%] top-[20%] h-72 w-72 bg-accent-500/25')}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                y: [0, -20, 0],
                x: [0, 10, 0],
              }
        }
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={cn(blobBase, 'right-[8%] top-[8%] h-80 w-80 bg-teal-400/25')}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                y: [0, 30, 0],
                x: [0, -20, 0],
              }
        }
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
