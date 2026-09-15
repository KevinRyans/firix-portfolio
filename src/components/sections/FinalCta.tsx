import { business, finalCta } from '../../content/site'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import { Section } from '../ui/Section'

export default function FinalCta() {
  return (
    <Section tone="dark" flush className="py-24 sm:py-32">
      <div className="text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-balance text-display font-semibold text-fg">
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-prose text-lead text-fg-faint">{finalCta.lead}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button to={finalCta.cta.to} size="lg" className="w-full sm:w-auto">
              {finalCta.cta.label}
            </Button>
            <Button href={`mailto:${business.email}`} variant="quiet">
              eller send en e-post direkte
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
