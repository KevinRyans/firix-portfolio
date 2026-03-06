import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useProfile } from '../../lib/i18n'
import { buttonStyles } from '../ui/buttonStyles'

export default function HeroShowcase() {
  const shouldReduceMotion = useReducedMotion()
  const profile = useProfile()
  const withBase = (path: string) =>
    `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

  return (
    <section className="relative overflow-hidden">
      {/* Line grid */}
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(28,28,40,1) 1px,transparent 1px),linear-gradient(90deg,rgba(28,28,40,1) 1px,transparent 1px)", backgroundSize: "64px 64px", opacity: 0.35 }} />
      {/* Glow top-right */}
      <div className="pointer-events-none absolute" style={{ width: "600px", height: "600px", background: "radial-gradient(circle,rgba(127,255,178,0.07) 0%,transparent 70%)", top: "-100px", right: "-150px" }} />
      {/* Glow bottom-left */}
      <div className="pointer-events-none absolute" style={{ width: "400px", height: "400px", background: "radial-gradient(circle,rgba(91,140,255,0.05) 0%,transparent 70%)", bottom: "0", left: "-100px" }} />

      <div className="relative grid items-center gap-12 py-10 md:py-16 lg:grid-cols-2">
        {/* Left: text */}
        <div className="space-y-6">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent-400/50" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-400">
              {profile.home.heroEyebrow}
            </span>
          </div>

          {/* Heading */}
          <motion.h1
            className="font-display font-extrabold leading-[0.93] text-white" style={{ fontSize: "clamp(3rem,7.5vw,6.8rem)", letterSpacing: "-0.04em" }}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            Hey, I&apos;m{' '}
            <span className="text-gradient">{profile.name}.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="max-w-lg text-base leading-relaxed text-slate-400 md:text-lg"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          >
            {profile.home.heroSubtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          >
            <Link to="/projects" className={buttonStyles({ variant: 'primary' })}>
              {profile.ctas.primaryLabel}
            </Link>
            <Link to="/contact" className={buttonStyles({ variant: 'secondary' })}>
              {profile.ctas.secondaryLabel}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap gap-8 border-t border-[#1c1c28] pt-5"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            {profile.heroStats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-bold text-white">{stat.value}</p>
                <p className="mt-0.5 text-xs uppercase tracking-[0.2em] text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: spinning avatar ring */}
        <motion.div
          className="flex items-center justify-center"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        >
          <div className="relative flex h-72 w-72 items-center justify-center md:h-80 md:w-80">
            {/* Outer ambient glow */}
            <div className="absolute inset-0 rounded-full bg-accent-400/5 blur-3xl" />

            {/* Spinning gradient ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0%, rgba(127,255,178,0.5) 40%, rgba(91,140,255,0.3) 65%, transparent 100%)',
                padding: '2px',
                borderRadius: '50%',
              }}
              animate={shouldReduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            >
              <div className="h-full w-full rounded-full bg-base-950" />
            </motion.div>

            {/* Static dashed track ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-white/10" />

            {/* Orbiting green dot */}
            <motion.div
              className="absolute inset-0"
              animate={shouldReduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            >
              <div
                className="absolute left-1/2 top-0 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-400"
                style={{ boxShadow: '0 0 12px rgba(127,255,178,0.9), 0 0 4px rgba(127,255,178,1)' }}
              />
            </motion.div>

            {/* Avatar image circle */}
            <div className="relative flex h-56 w-56 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-base-900 md:h-64 md:w-64">
              <img
                src={withBase(profile.media.memojiImage)}
                alt={profile.media.memojiAlt}
                className="h-full w-full object-cover object-center"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
