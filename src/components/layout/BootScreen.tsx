import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../../content/profile'

const statusLines = [
  'Loading core modules',
  'Compiling interface layers',
  'Syncing data cache',
  'Rendering UI',
]

export default function BootScreen() {
  const shouldReduceMotion = useReducedMotion()
  const brandName = profile.brand?.name ?? profile.meta.title
  const brandMark = profile.brand?.mark ?? profile.name.slice(0, 1)

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
        <div className="mb-6 flex items-center gap-4">
          <div className="relative h-14 w-14">
            <div className="absolute inset-0 rounded-2xl bg-accent-500/30 blur-xl" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl font-semibold text-accent-300">
              {brandMark}
            </div>
          </div>
          <div className="text-left">
            <p className="text-[11px] uppercase tracking-[0.4em] text-slate-500">
              Booting
            </p>
            <p className="text-2xl font-semibold text-white">{brandName}</p>
          </div>
        </div>

        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-5 text-left shadow-soft">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
            Initializing
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-accent-500 via-teal-400 to-accent-300"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: shouldReduceMotion ? 0.7 : 3.5,
                ease: 'easeInOut',
              }}
            />
          </div>
          <div className="mt-4 space-y-2 text-sm text-slate-400">
            {statusLines.map((line) => (
              <div key={line} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-400/70" />
                <span>{line}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
