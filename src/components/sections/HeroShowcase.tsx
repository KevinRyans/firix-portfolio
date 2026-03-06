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

        {/* Right: avatar with float + ring */}
        <motion.div
          className="flex items-center justify-center"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        >
          <div
            className="memoji-wrap"
            style={{
              position: 'relative',
              width: '240px',
              height: '240px',
              animation: shouldReduceMotion ? 'none' : 'heroFloat 6s ease-in-out infinite',
            }}
          >
            {/* Outer ambient glow */}
            <div className="absolute inset-0 rounded-full bg-accent-400/5 blur-3xl" />

            {/* Spinning ring */}
            <div
              style={{
                position: 'absolute',
                inset: '-14px',
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, transparent 0%, rgba(127,255,178,0.5) 40%, rgba(91,140,255,0.3) 65%, transparent 100%)',
                padding: '2px',
                animation: shouldReduceMotion ? 'none' : 'heroSpin 18s linear infinite',
              }}
            >
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#09090e' }} />
            </div>

            {/* Static dashed track ring */}
            <div
              style={{
                position: 'absolute',
                inset: '-14px',
                borderRadius: '50%',
                border: '1px dashed rgba(255,255,255,0.1)',
                pointerEvents: 'none',
              }}
            />

            {/* Orbiting accent dot */}
            <div
              style={{
                position: 'absolute',
                inset: '-14px',
                borderRadius: '50%',
                animation: shouldReduceMotion ? 'none' : 'heroSpin 18s linear infinite',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: '#7fffb2',
                  boxShadow: '0 0 12px rgba(127,255,178,0.9), 0 0 4px rgba(127,255,178,1)',
                }}
              />
            </div>

            {/* Avatar image */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)',
                background: '#0e0e18',
              }}
            >
              <img
                src={withBase('images/avatar.png')}
                alt={profile.media.memojiAlt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  mixBlendMode: 'lighten',
                }}
                loading="eager"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
