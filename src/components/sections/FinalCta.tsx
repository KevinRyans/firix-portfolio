import { business, finalCta } from '../../content/site'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import { Section } from '../ui/Section'

export default function FinalCta() {
  return (
    <Section tone="ink" flush className="py-24 sm:py-32">
      <Reveal className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <h2 className="max-w-[14ch] text-balance text-display text-fg">{finalCta.title}</h2>
          <p className="mt-6 max-w-prose text-lead text-fg-faint">{finalCta.lead}</p>
        </div>
        <div className="flex flex-col items-start gap-5 lg:items-end">
          <Button to={finalCta.cta.to} size="lg" className="w-full sm:w-auto">
            {finalCta.cta.label}
          </Button>
          <a
            href={`mailto:${business.email}`}
            className="text-[16px] text-fg-soft underline decoration-hairline-strong underline-offset-4 hover:text-fg hover:decoration-current"
          >
            eller send en e-post til {business.email}
          </a>
        </div>
      </Reveal>
    </Section>
  )
}
