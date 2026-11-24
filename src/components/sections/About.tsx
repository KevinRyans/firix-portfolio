import { about } from '../../content/site'
import Reveal from '../ui/Reveal'
import { Section, SectionHeading } from '../ui/Section'

/**
 * Ark 04. Personen bak.
 *
 * Hele salgsargumentet er at kunden snakker direkte med utvikleren, og da
 * må det finnes en utvikler å se. Fakta står som en spesifikasjonsliste,
 * slik en tegning lister materialer: kort, konkret og etterprøvbart.
 */
export default function About() {
  return (
    <Section id="om">
      <SectionHeading sheet={4} title={about.title} />

      <div className="mt-14 grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <Reveal>
          {about.portrait ? (
            <figure className="w-40 sm:w-48">
              <div className="crop">
                <img
                  src={about.portrait}
                  alt={about.portraitAlt}
                  width={192}
                  height={192}
                  loading="lazy"
                  className="aspect-square w-full border-[1.5px] border-rule bg-elevated object-cover"
                />
              </div>
              <figcaption className="mt-4 text-[13px] text-fg-faint">
                Michael Firing, utvikler
              </figcaption>
            </figure>
          ) : null}
        </Reveal>

        <div>
          <div className="max-w-prose space-y-5">
            {about.body.map((paragraph) => (
              <Reveal key={paragraph.slice(0, 32)}>
                <p className="text-[18px] leading-[1.65] text-fg-soft">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <dl className="mt-12 border-t-[1.5px] border-rule">
            {about.facts.map((fact) => (
              <div
                key={fact.label}
                className="grid grid-cols-[1fr_auto] items-baseline gap-6 border-b border-hairline-strong py-4"
              >
                <dt className="text-[15px] text-fg-faint">{fact.label}</dt>
                <dd className="text-[20px] font-semibold tracking-[-0.02em] text-fg">
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
