import { motion, useReducedMotion } from 'framer-motion'
import { useProfile } from '../../lib/i18n'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
}

const letter = {
  hidden: { opacity: 0, y: 8, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export default function BootScreen() {
  const shouldReduceMotion = useReducedMotion()
  const profile = useProfile()
  const brandName = profile.brand?.name ?? profile.meta.title
  const brandMark = profile.brand?.mark ?? profile.name.slice(0, 1)
  const bootCopy = profile.boot ?? {
    loadingLabel: 'Assembling interface modules',
    completeLabel: 'Complete',
  }
  const letters = brandName.split('')

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-base-950 text-slate-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0.15 : 0.4 }}
      aria-busy="true"
      role="status"
    >
      <div className="absolute inset-0 bg-hero-glow opacity-70" />
      <div className="absolute inset-0 geo-grid opacity-35 motion-reduce:animate-none" />
      <div className="absolute inset-0 geo-grid-soft opacity-25 motion-reduce:animate-none" />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center">
        <div className="mb-8 flex flex-col items-center gap-5">
          <div className="relative flex items-center justify-center">
            <motion.div
              className="h-20 w-20 rounded-full border border-white/15 border-t-accent-400"
              animate={shouldReduceMotion ? undefined : { rotate: 360 }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <div className="absolute flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl font-semibold text-accent-300 shadow-soft">
              {brandMark}
            </div>
          </div>

          <motion.div
            className="text-3xl font-semibold text-white"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {letters.map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                variants={letter}
                className={char === ' ' ? 'inline-block w-2' : 'inline-block'}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          <p className="text-sm text-slate-400">{bootCopy.loadingLabel}</p>
        </div>

        <motion.div
          className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-teal-300"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: shouldReduceMotion ? 0.3 : 2.6,
            duration: 0.5,
            ease: 'easeOut',
          }}
        >
          <span className="h-2 w-2 rounded-full bg-teal-300" />
          {bootCopy.completeLabel}
        </motion.div>
      </div>
    </motion.div>
  )
}
