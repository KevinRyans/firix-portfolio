import { business, finalCta } from '../../content/site'
import { messagingChannels } from '../../lib/messaging'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import { Section, SectionHeading } from '../ui/Section'

/**
 * Ark 07, siste ark i settet. Kontaktinformasjonen står i et tegningshode,
 * samme form som øverst på siden: settet åpner og lukker likt.
 */
export default function FinalCta() {
  const sms = messagingChannels().find((channel) => channel.id === 'sms')

  const cells = [
    { label: 'E-post', value: business.email, href: `mailto:${business.email}` },
    sms ? { label: 'Melding', value: business.mobileLabel, href: sms.href } : null,
    { label: 'Svar', value: business.responseTime },
    { label: 'Sted', value: `${business.city}, hele Norge` },
  ].filter(Boolean) as { label: string; value: string; href?: string }[]

  return (
    <Section tone="ink" paper>
      <SectionHeading sheet={7} title={finalCta.title} lead={finalCta.lead} />

      <Reveal className="mt-12 grid gap-10 lg:grid-cols-[auto_1fr] lg:items-end">
        <Button to={finalCta.cta.to} size="lg" className="w-full sm:w-auto">
          {finalCta.cta.label}
        </Button>

        <dl className="grid grid-cols-2 border-[1.5px] border-rule lg:ml-auto lg:w-max lg:grid-cols-4">
          {cells.map((cell, index) => (
            <div
              key={cell.label}
              className={[
                'px-4 py-3',
                index % 2 === 0 ? 'border-r border-rule' : '',
                index < 2 ? 'border-b border-rule lg:border-b-0' : '',
                index === 1 ? 'lg:border-r' : '',
              ].join(' ')}
            >
              <dt className="text-[12px] text-fg-faint">{cell.label}</dt>
              <dd className="mt-0.5 text-[15px] font-semibold text-fg">
                {cell.href ? (
                  <a
                    href={cell.href}
                    className="underline decoration-hairline-strong underline-offset-4 hover:decoration-current"
                  >
                    {cell.value}
                  </a>
                ) : (
                  cell.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  )
}
