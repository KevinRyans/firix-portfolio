import { about } from '../../content/site'
import Reveal from '../ui/Reveal'
import { Section, SectionHeading } from '../ui/Section'

/**
 * Kort presentasjon av personen bak.
 *
 * Hele salgsargumentet er at kunden snakker direkte med utvikleren, og da
 * må det finnes en utvikler å se. Uten et ansikt eller et navn er «ingen
 * mellomledd» bare en påstand.
 */
export default function About() {
  return (
    <Section id="om">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          {/* Avataren er tegnet, ikke fotografert, og tåler ikke stort format. */}
          {about.portrait ? (
            <Reveal>
              <img
                src={about.portrait}
                alt={about.portraitAlt}
                width={96}
                height={96}
                loading="lazy"
                className="mb-8 h-24 w-24 rounded-full object-cover ring-1 ring-hairline-strong"
              />
            </Reveal>
          ) : null}
          <SectionHeading title={about.title} />
        </div>

        <div>
          <div className="max-w-prose space-y-5">
            {about.body.map((paragraph) => (
              <Reveal key={paragraph.slice(0, 32)}>
                <p className="text-[18px] leading-[1.6] text-fg-soft">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <dl className="mt-12 grid gap-6 border-t border-hairline-strong pt-8 sm:grid-cols-3">
            {about.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col">
                <dt className="order-2 mt-1 text-[14px] leading-snug text-fg-faint">
                  {fact.label}
                </dt>
                <dd className="order-1 text-[26px] font-semibold tracking-[-0.03em] text-fg">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}
