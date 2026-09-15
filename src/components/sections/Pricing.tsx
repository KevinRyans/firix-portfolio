import { priceSection, pricing } from '../../content/site'
import { cn, formatPrice } from '../../lib/utils'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import { Section, SectionHeading } from '../ui/Section'

/** Ingen pris utfylt? Da sier vi det rett ut i stedet for å vise «fra 0 kr». */
function PriceTag({ from, currency }: { from: number; currency: string }) {
  if (!from) {
    return (
      <p className="text-[28px] font-semibold tracking-[-0.02em] text-ink">Pris på forespørsel</p>
    )
  }
  return (
    <p className="flex items-baseline gap-1.5">
      <span className="text-[14px] text-ink-faint">fra</span>
      <span className="text-[38px] font-semibold tracking-[-0.03em] text-ink">
        {formatPrice(from)}
      </span>
      <span className="text-[16px] text-ink-faint">{currency}</span>
    </p>
  )
}

export default function Pricing() {
  return (
    <Section id="priser">
      <SectionHeading
        eyebrow={priceSection.eyebrow}
        title={priceSection.title}
        lead={priceSection.lead}
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {pricing.packages.map((pack, index) => {
          const featured = 'featured' in pack && pack.featured
          const saving = pack.agencyFrom && pack.from ? pack.agencyFrom - pack.from : 0

          return (
            <Reveal key={pack.id} delay={index * 0.08}>
              <div
                className={cn(
                  'flex h-full flex-col rounded-panel border bg-surface p-8 transition-shadow duration-500 ease-apple',
                  featured
                    ? 'border-brand-500/40 shadow-lift ring-1 ring-brand-500/20'
                    : 'border-line-soft shadow-card hover:shadow-lift',
                )}
              >
                {featured ? (
                  <p className="mb-4 w-fit rounded-full bg-brand-50 px-3 py-1 text-[12px] font-semibold text-brand-600">
                    Mest valgt
                  </p>
                ) : null}

                <h3 className="text-title font-semibold text-ink">{pack.name}</h3>
                <p className="mt-1.5 text-[14px] text-ink-faint">{pack.tagline}</p>

                <div className="mt-7">
                  <PriceTag from={pack.from} currency={pricing.currency} />
                  {saving > 0 ? (
                    <p className="mt-2 text-[13px] text-ink-ghost">
                      Byrå tar typisk fra{' '}
                      <span className="line-through decoration-ink-ghost/60">
                        {formatPrice(pack.agencyFrom)} {pricing.currency}
                      </span>{' '}
                      <span className="font-medium text-positive">
                        — du sparer {formatPrice(saving)} {pricing.currency}
                      </span>
                    </p>
                  ) : null}
                  <p className="mt-2 text-[13px] text-ink-ghost">Leveringstid: {pack.timeline}</p>
                </div>

                <p className="mt-6 border-t border-line-soft pt-6 text-[14px] leading-relaxed text-ink-soft">
                  {pack.bestFor}
                </p>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {pack.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[14px] text-ink-soft">
                      <svg
                        viewBox="0 0 16 16"
                        className="mt-[3px] h-3.5 w-3.5 shrink-0 text-brand-500"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M6.2 11.8 3 8.6l1.1-1.1 2.1 2.1 5.7-5.7L13 5z"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>

                <Button
                  to="/kontakt"
                  variant={featured ? 'primary' : 'secondary'}
                  className="mt-8 w-full"
                >
                  Be om fastpris
                </Button>
              </div>
            </Reveal>
          )
        })}
      </div>

      <div className="mt-14 grid gap-10 rounded-panel border border-line-soft bg-muted p-8 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <Reveal>
          <h3 className="text-title font-semibold text-ink">{priceSection.comparisonTitle}</h3>
          <ul className="mt-5 space-y-3">
            {priceSection.comparisonItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] text-ink-soft">
                <svg
                  viewBox="0 0 16 16"
                  className="mt-[3px] h-3.5 w-3.5 shrink-0 text-ink-ghost"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M12.7 4.4 11.6 3.3 8 6.9 4.4 3.3 3.3 4.4 6.9 8l-3.6 3.6 1.1 1.1L8 9.1l3.6 3.6 1.1-1.1L9.1 8z"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[15px] leading-relaxed text-ink-faint">{priceSection.disclaimer}</p>
          <p className="mt-4 text-[13px] text-ink-ghost">{pricing.vatNote}</p>
          {pricing.hourlyRate > 0 ? (
            <p className="mt-1 text-[13px] text-ink-ghost">
              Løpende arbeid faktureres til {formatPrice(pricing.hourlyRate)} {pricing.currency} per
              time.
            </p>
          ) : null}
        </Reveal>
      </div>
    </Section>
  )
}
