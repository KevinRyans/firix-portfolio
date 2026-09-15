import { process } from '../../content/site'
import Reveal from '../ui/Reveal'
import { Section, SectionHeading } from '../ui/Section'

export default function Process() {
  return (
    <Section id="prosess" tone="muted">
      <SectionHeading eyebrow={process.eyebrow} title={process.title} lead={process.lead} />

      <ol className="mt-14 grid gap-px overflow-hidden rounded-panel border border-line-soft bg-line-soft sm:grid-cols-2 lg:grid-cols-4">
        {process.steps.map((step, index) => (
          <li key={step.n} className="bg-surface">
            <Reveal delay={index * 0.07} className="h-full p-8">
              <p className="text-[13px] font-semibold tracking-[0.08em] text-brand-500">{step.n}</p>
              <h3 className="mt-4 text-[19px] font-semibold tracking-[-0.015em] text-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-faint">{step.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
