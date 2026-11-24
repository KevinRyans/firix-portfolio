import { useRef } from 'react'
import { motion, useReducedMotion, useScroll } from 'framer-motion'
import { hero } from '../../content/site'
import Button from '../ui/Button'
import LayerStack from '../hero/LayerStack'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Teksten kommer inn én gang, sammen med at platene lander. Ingen andre
  // seksjoner på siden har en egen inngang som konkurrerer med denne.
  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        }

  return (
    <section
      ref={ref}
      data-tone="light"
      className="relative overflow-hidden bg-ground pt-[var(--nav-height)] text-fg"
    >
      <div className="shell grid items-center gap-4 pb-14 pt-10 sm:pt-16 lg:min-h-[calc(100svh-var(--nav-height))] lg:grid-cols-[1.1fr_1fr] lg:gap-0 lg:pb-20 lg:pt-8">
        <div className="relative z-10 max-w-[640px]">
          <motion.p {...enter(0)} className="text-eyebrow font-medium text-fg-faint">
            {hero.byline}
          </motion.p>
          <motion.h1 {...enter(0.08)} className="mt-5 text-hero text-fg">
            {hero.title[0]}
            <br />
            {hero.title[1]}
          </motion.h1>
          <motion.p {...enter(0.18)} className="mt-7 max-w-[34ch] text-lead text-fg-soft">
            {hero.lead}
          </motion.p>
          <motion.div
            {...enter(0.28)}
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

        <div className="relative -mx-5 sm:mx-0 xl:-translate-x-20">
          <LayerStack progress={scrollYProgress} />
          {/* Under xl er det ikke plass ved siden av stabelen, så etikettene står under. */}
          <ol className="mx-auto mt-6 grid max-w-md grid-cols-3 gap-2 px-5 text-center sm:px-0 xl:hidden">
            {hero.layers.map((layer) => (
              <li key={layer.id}>
                <p className="text-[15px] font-semibold tracking-[-0.01em] text-fg">
                  {layer.label}
                </p>
                <p className="mt-0.5 text-[12px] leading-snug text-fg-faint">{layer.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
