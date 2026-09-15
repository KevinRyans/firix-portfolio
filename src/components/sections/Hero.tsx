import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { business, hero } from '../../content/site'
import Button from '../ui/Button'

const EASE = [0.28, 0.11, 0.32, 1] as const

export default function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  // Scroll-koblet utgang: innholdet trekker seg litt tilbake og toner ut
  // etter hvert som man forlater heroen, slik Apple gjør på produktsidene.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const y = useTransform(scrollYProgress, [0, 1], [0, 60])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.35])

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        }

  const motionStyle = reduce ? undefined : { scale, y, opacity }

  return (
    <section
      ref={ref}
      data-tone="light"
      className="relative isolate overflow-hidden bg-ground pt-[calc(var(--nav-height)+72px)] sm:pt-[calc(var(--nav-height)+104px)]"
    >
      {/* Fargevask i toppen som utvider seg mens man scroller — gir dybde
          uten at noe konkurrerer med teksten. */}
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { scale: glowScale }}
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] origin-top bg-[radial-gradient(60%_60%_at_50%_0%,rgba(0,113,227,0.13),transparent_70%)]"
      />

      <motion.div style={motionStyle} className="shell relative pb-20 text-center sm:pb-28">
        <motion.p
          {...rise(0)}
          className="text-eyebrow font-semibold uppercase tracking-[0.08em] text-accent"
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          {...rise(0.08)}
          className="mx-auto mt-5 max-w-4xl text-balance text-hero font-semibold text-fg"
        >
          {hero.title.map((line, index) => (
            <span key={line} className="sm:block">
              {line}
              {index < hero.title.length - 1 ? ' ' : ''}
            </span>
          ))}
        </motion.h1>

        <motion.p {...rise(0.16)} className="mx-auto mt-7 max-w-prose text-lead text-fg-faint">
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

        <motion.p {...rise(0.32)} className="mt-6 text-[13px] text-fg-faint">
          Gratis og uforpliktende første samtale · Svar {business.responseTime}
        </motion.p>
      </motion.div>
    </section>
  )
}
