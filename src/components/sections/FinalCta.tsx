import { business, finalCta } from '../../content/site'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'

export default function FinalCta() {
  return (
    <section className="bg-ink py-24 text-white sm:py-32">
      <div className="shell text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-display font-semibold">{finalCta.title}</h2>
          <p className="mx-auto mt-6 max-w-prose text-lead text-white/70">{finalCta.lead}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button to={finalCta.cta.to} size="lg" className="w-full sm:w-auto">
              {finalCta.cta.label}
            </Button>
            <Button
              href={`mailto:${business.email}`}
              variant="quiet"
              className="text-white/80 hover:text-white"
            >
              eller send en e-post direkte
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
