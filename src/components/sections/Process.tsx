import { process } from '../../content/site'
import Reveal from '../ui/Reveal'
import { Section, SectionHeading } from '../ui/Section'

export default function Process() {
  return (
    <Section id="prosess" tone="dark">
      <SectionHeading eyebrow={process.eyebrow} title={process.title} lead={process.lead} />

      <ol className="mt-14 grid gap-px overflow-hidden rounded-panel border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
        {process.steps.map((step, index) => (
          <li
            key={step.n}
            className="group relative bg-elevated transition-colors duration-500 hover:bg-white/[0.06]"
          >
            <Reveal delay={index * 0.07} className="h-full p-8">
              <p className="text-[13px] font-semibold tracking-[0.08em] text-accent">{step.n}</p>
              <h3 className="mt-4 text-[19px] font-semibold tracking-[-0.015em] text-fg">
                {step.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-fg-faint">{step.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
