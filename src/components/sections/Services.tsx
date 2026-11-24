import { layers, services } from '../../content/site'
import LayerMark from '../drawing/LayerMark'
import Reveal from '../ui/Reveal'
import { Section, SectionHeading } from '../ui/Section'

/**
 * Ark 02. Tjenestene som de tre lagene fra tegningen, med samme bokstaver,
 * så illustrasjonen og listen leses som én forklaring.
 */
export default function Services() {
  return (
    <Section id="tjenester" tone="muted">
      <SectionHeading sheet={2} title={services.title} lead={services.lead} />

      <ul className="mt-14 grid border-y border-hairline-strong lg:grid-cols-3">
        {services.items.map((item, index) => {
          const mark = layers.find((layer) => layer.id === item.layer)?.mark
          return (
            <li
              key={item.title}
              className={
                index > 0 ? 'border-t border-hairline-strong lg:border-l lg:border-t-0' : undefined
              }
            >
              <Reveal
                delay={index * 0.06}
                className={`flex h-full flex-col py-10 lg:px-10 ${index === 0 ? 'lg:pl-0' : ''} ${index === 2 ? 'lg:pr-0' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <p className="text-[15px] font-bold text-accent">{mark}</p>
                  <LayerMark layer={item.layer} className="-mt-2 h-24 w-auto text-accent" />
                </div>
                <h3 className="mt-4 text-title text-fg">{item.title}</h3>
                <p className="mt-4 max-w-prose flex-1 text-[17px] leading-[1.6] text-fg-soft">
                  {item.body}
                </p>
                <ul className="mt-8 space-y-2 border-t border-hairline pt-6">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-[15px] text-fg-soft">
                      <span className="h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
