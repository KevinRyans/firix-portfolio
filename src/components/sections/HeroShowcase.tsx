import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useProfile } from '../../lib/i18n'
import { buttonStyles } from '../ui/buttonStyles'
import Badge from '../ui/Badge'

export default function HeroShowcase() {
  const shouldReduceMotion = useReducedMotion()
  const profile = useProfile()
  const titleLines = profile.home.heroTitle.split('\n')
  const withBase = (path: string) =>
    `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-base-900/70 p-6 shadow-soft backdrop-blur md:p-10">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent" />
      <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
            {profile.name}
          </p>
          <Badge tone="accent" className="w-fit">
            {profile.home.heroEyebrow}
          </Badge>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold text-white md:text-5xl">
              {titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="text-base text-slate-300 md:text-lg">
              {profile.home.heroSubtitle}
            </p>
          </div>
          <p className="text-sm text-slate-400 md:text-base">{profile.tagline}</p>
          <p className="text-sm text-slate-500 md:text-base">{profile.intro}</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/projects" className={buttonStyles({ variant: 'primary' })}>
              {profile.ctas.primaryLabel}
            </Link>
            <Link to="/contact" className={buttonStyles({ variant: 'secondary' })}>
              {profile.ctas.secondaryLabel}
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-6">
            {profile.heroStats.map((stat) => (
              <div key={stat.label} className="min-w-[110px]">
                <p className="text-xl font-semibold text-white">{stat.value}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-accent-500/25 via-transparent to-teal-400/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-base-950/70 shadow-glow">
            <div className="relative aspect-[4/5]">
              <img
                src={withBase(profile.media.profileImage)}
                alt={profile.media.profileAlt}
                className="absolute inset-x-0 bottom-0 h-full w-full object-contain"
                style={{
                  transform: `translateY(${profile.media.profileOffsetY}px) scale(${profile.media.profileScale})`,
                }}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.src = withBase('images/profile-placeholder.png')
                }}
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base-950/80 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
