import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { process } from '../../content/site'
import { Section, SectionHeading } from '../ui/Section'

/**
 * Prosessen er en ekte rekkefølge, så den får tall og en linje. Linjen fylles
 * mens du scroller gjennom stegene — den viser hvor i løpet du er, ikke bare
 * pynt.
 */
export default function Process() {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.6'] })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <Section id="prosess" tone="muted">
      <SectionHeading title={process.title} lead={process.lead} />

      <ol
        ref={ref}
        className="relative mt-16 grid gap-10 pl-10 lg:grid-cols-4 lg:gap-8 lg:pl-0 lg:pt-12"
      >
        {/* Sporet og fyllet. Vertikalt på mobil, vannrett på desktop. */}
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-[11px] top-2 w-[2px] bg-hairline lg:hidden"
        />
        <span
          aria-hidden="true"
          className="absolute left-0 right-0 top-[11px] hidden h-[2px] bg-hairline lg:block"
        />
        <motion.span
          aria-hidden="true"
          className="absolute bottom-2 left-[11px] top-2 w-[2px] origin-top bg-accent-solid lg:hidden"
          style={reduce ? undefined : { scaleY: fill }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute left-0 right-0 top-[11px] hidden h-[2px] origin-left bg-accent-solid lg:block"
          style={reduce ? undefined : { scaleX: fill }}
        />

        {process.steps.map((step, index) => (
          <li key={step.title} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-10 top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent-solid bg-ground text-[12px] font-bold text-fg lg:-top-12 lg:left-0"
            >
              {index + 1}
            </span>
            <h3 className="text-[21px] font-semibold tracking-[-0.02em] text-fg">
              <span className="sr-only">Steg {index + 1}: </span>
              {step.title}
            </h3>
            <p className="mt-3 max-w-[38ch] text-[16px] leading-relaxed text-fg-soft">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
