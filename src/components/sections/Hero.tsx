import { motion, useReducedMotion } from 'framer-motion'
import { business, hero } from '../../content/site'
import Button from '../ui/Button'

export default function Hero() {
  const reduce = useReducedMotion()
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.28, 0.11, 0.32, 1] as const },
        }

  return (
    <section className="relative overflow-hidden pt-[calc(var(--nav-height)+72px)] sm:pt-[calc(var(--nav-height)+104px)]">
      {/* Svak fargevask i toppen — Apples måte å gi dybde uten støy. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(0,113,227,0.10),transparent_70%)]"
      />
      <div className="shell relative pb-20 text-center sm:pb-28">
        <motion.p
          {...rise(0)}
          className="text-eyebrow font-semibold uppercase tracking-[0.08em] text-brand-500"
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          {...rise(0.08)}
          className="mx-auto mt-5 max-w-4xl whitespace-pre-line text-hero font-semibold text-ink"
        >
          {hero.title}
        </motion.h1>

        <motion.p {...rise(0.16)} className="mx-auto mt-7 max-w-prose text-lead text-ink-faint">
          {hero.lead}
        </motion.p>

        <motion.div
          {...rise(0.24)}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <Button to={hero.primaryCta.to} size="lg" className="w-full sm:w-auto">
            {hero.primaryCta.label}
          </Button>
          <Button
            to={hero.secondaryCta.to}
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            {hero.secondaryCta.label}
          </Button>
        </motion.div>

        <motion.p {...rise(0.32)} className="mt-6 text-[13px] text-ink-ghost">
          Gratis og uforpliktende første samtale · Svar {business.responseTime}
        </motion.p>
      </div>
    </section>
  )
}
