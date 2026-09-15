import { services } from '../../content/site'
import Reveal from '../ui/Reveal'
import { Section, SectionHeading } from '../ui/Section'

export default function Services() {
  return (
    <Section id="tjenester">
      <SectionHeading eyebrow={services.eyebrow} title={services.title} lead={services.lead} />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {services.items.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.08}>
            <div className="flex h-full flex-col rounded-panel border border-line-soft bg-surface p-8 shadow-card transition-shadow duration-500 ease-apple hover:shadow-lift">
              <h3 className="text-title font-semibold text-ink">{item.title}</h3>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-faint">{item.body}</p>
              <ul className="mt-6 space-y-2 border-t border-line-soft pt-6">
                {item.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-[14px] text-ink-soft">
                    <svg
                      viewBox="0 0 16 16"
                      className="mt-[3px] h-3.5 w-3.5 shrink-0 text-brand-500"
                      aria-hidden="true"
                    >
                      <path fill="currentColor" d="M6.2 11.8 3 8.6l1.1-1.1 2.1 2.1 5.7-5.7L13 5z" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
