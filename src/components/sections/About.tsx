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
    <Section id="om" tone="muted">
      <div>
        <div>
          {/* Avataren står ved overskriften framfor å fylle en egen kolonne.
              Den er tegnet, ikke fotografert, og tåler ikke stort format uten
              å dra seksjonen mot spillprofil. */}
          {about.portrait ? (
            <Reveal>
              <img
                src={about.portrait}
                alt={about.portraitAlt}
                width={88}
                height={88}
                loading="lazy"
                className="mb-6 h-[88px] w-[88px] rounded-full object-cover shadow-card ring-1 ring-hairline"
              />
            </Reveal>
          ) : null}

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
      </div>
    </Section>
  )
}
