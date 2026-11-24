import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { hero, layers } from '../../content/site'
import Button from '../ui/Button'
import Axonometric from '../drawing/Axonometric'

const EASE = [0.22, 1, 0.36, 1] as const

function useMedia(query: string) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const list = window.matchMedia(query)
    const update = () => setMatches(list.matches)
    update()
    list.addEventListener('change', update)
    return () => list.removeEventListener('change', update)
  }, [query])
  return matches
}

/** Ark 01. Tegningen og påstanden den beviser. */
export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Lagene skilles mer på store skjermer, der det er plass til det.
  const wide = useMedia('(min-width: 1024px)')
  // Under sm skjules henvisningslinjene, og tegningen beskjæres til platene.
  const small = !useMedia('(min-width: 640px)')

  const raw = useTransform(scrollYProgress, (p) => {
    if (reduce) return 100
    const t = Math.min(1, p / 0.7)
    return 88 + t * (wide ? 64 : 30)
  })
  const gap = useSpring(raw, { stiffness: 140, damping: 26, mass: 0.5 })

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        }

  return (
    <section
      ref={ref}
      data-tone="light"
      className="grid-paper relative overflow-hidden bg-ground pt-[var(--nav-height)] text-fg"
    >
      <div className="shell">
        <div className="grid items-end gap-6 pb-10 pt-12 sm:pt-16 lg:min-h-[calc(100svh-var(--nav-height)-150px)] lg:grid-cols-[1.02fr_1fr] lg:gap-4 lg:pt-10">
          <div className="relative z-10 pb-4 lg:pb-12">
            <motion.h1 {...enter(0)} className="max-w-[15ch] text-hero text-fg">
              {hero.title.map((line) => (
                <span key={line} className="lg:block">
                  {line}{' '}
                </span>
              ))}
            </motion.h1>
            <motion.p
              {...enter(0.12)}
              className="mt-7 max-w-[40ch] text-pretty text-lead text-fg-soft"
            >
              {hero.lead}
            </motion.p>
            <motion.div
              {...enter(0.22)}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Button to={hero.primaryCta.to} size="lg">
                {hero.primaryCta.label}
              </Button>
              <Button to={hero.secondaryCta.to} size="lg" variant="secondary">
                {hero.secondaryCta.label}
              </Button>
            </motion.div>
          </div>

          <div className="relative">
            <div className="mx-auto max-w-[460px] sm:max-w-none lg:-mr-6">
              <Axonometric gap={gap} compact={small} />
            </div>

            {/* Under sm er det ikke plass til henvisningslinjene. */}
            <ol className="mt-2 grid grid-cols-3 gap-3 border-t border-hairline-strong pt-4 sm:hidden">
              {layers.map((layer) => (
                <li key={layer.id}>
                  <p className="text-[13px] font-bold text-accent">{layer.mark}</p>
                  <p className="text-[15px] font-semibold tracking-[-0.01em] text-fg">
                    {layer.label}
                  </p>
                  <p className="mt-0.5 text-[12px] leading-snug text-fg-faint">{layer.note}</p>
                </li>
              ))}
            </ol>

            {/* Tegningshodet. */}
            <motion.dl
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.6 }}
              className="mt-6 grid grid-cols-[1fr_auto] border-[1.5px] border-rule bg-ground text-[12px] sm:ml-auto sm:w-max lg:-mt-10"
            >
              {hero.titleBlock.map((cell, index) => (
                <div
                  key={cell.label}
                  className={[
                    'px-3 py-2',
                    index % 2 === 0 ? 'border-r border-rule' : '',
                    index < 2 ? 'border-b border-rule' : '',
                  ].join(' ')}
                >
                  <dt className="text-[11px] text-fg-faint">{cell.label}</dt>
                  <dd className="text-[13px] font-semibold text-fg">{cell.value}</dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>
      </div>
    </section>
  )
}
