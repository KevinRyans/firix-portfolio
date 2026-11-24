import { services } from '../../content/site'
import LayerGlyph from '../hero/LayerGlyph'
import Reveal from '../ui/Reveal'
import { Section, SectionHeading } from '../ui/Section'

/**
 * Tjenestene i samme rekkefølge som stabelen i hero, ovenfra og ned. Hver
 * rad viser hvilket lag den gjelder, så illustrasjonen og listen leses som
 * én forklaring.
 */
export default function Services() {
  return (
    <Section id="tjenester" tone="muted">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
        <SectionHeading title={services.title} />
        <Reveal>
          <p className="max-w-[44ch] text-lead text-fg-faint lg:justify-self-end">
            {services.lead}
          </p>
        </Reveal>
      </div>

      <ul className="mt-14 border-t border-hairline-strong">
        {services.items.map((item) => (
          <li key={item.title} className="border-b border-hairline">
            <Reveal className="grid grid-cols-[52px_1fr] items-center gap-x-5 gap-y-5 py-10 sm:grid-cols-[72px_1fr] lg:grid-cols-[72px_minmax(0,0.8fr)_minmax(0,1.2fr)_minmax(0,0.7fr)] lg:items-start lg:gap-10">
              <LayerGlyph layer={item.layer} className="h-12 w-12 sm:h-14 sm:w-14" />
              <h3 className="text-title text-fg">{item.title}</h3>
              <p className="max-w-prose col-span-2 text-[17px] leading-[1.6] text-fg-soft sm:col-span-1 sm:col-start-2 lg:col-start-auto">
                {item.body}
              </p>
              <ul className="col-span-2 space-y-2 sm:col-span-1 sm:col-start-2 lg:col-start-auto">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-3 text-[15px] text-fg-soft">
                    <span
                      className="mt-[0.6em] h-[2px] w-3 shrink-0 bg-accent-solid"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
