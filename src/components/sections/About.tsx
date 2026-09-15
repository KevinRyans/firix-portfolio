import { about } from '../../content/site'
import { cn } from '../../lib/utils'
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
    <Section id="om" tone="muted">
      {/* Uten bilde er det ingen høyre kolonne å fylle — da ville et
          to-kolonners rutenett bare etterlatt et stort tomrom. */}
      <div
        className={cn(
          'grid gap-12',
          about.portrait && 'lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-16',
        )}
      >
        <div>
          <SectionHeading eyebrow={about.eyebrow} title={about.title} />

          <div className="mt-6 max-w-prose space-y-5">
            {about.body.map((paragraph) => (
              <Reveal key={paragraph.slice(0, 32)}>
                <p className="text-[17px] leading-[1.6] text-fg-soft">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <dl className="mt-10 grid gap-8 border-t border-hairline pt-8 sm:grid-cols-3">
            {about.facts.map((fact, index) => (
              <Reveal key={fact.label} delay={index * 0.07}>
                <dd className="text-[26px] font-semibold tracking-[-0.02em] text-fg">
                  {fact.value}
                </dd>
                <dt className="mt-1 text-[13px] leading-relaxed text-fg-faint">{fact.label}</dt>
              </Reveal>
            ))}
          </dl>
        </div>

        {/* Skjuler seg selv til du legger inn et bilde. */}
        {about.portrait ? (
          <Reveal delay={0.1}>
            <img
              src={about.portrait}
              alt={about.portraitAlt}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-panel object-cover shadow-card"
            />
          </Reveal>
        ) : null}
      </div>
    </Section>
  )
}
