import { useEffect } from 'react'
import Button from '../components/ui/Button'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Siden finnes ikke — Firix'
  }, [])

  return (
    <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-eyebrow font-semibold uppercase tracking-[0.08em] text-brand-500">404</p>
      <h1 className="mt-4 text-display font-semibold text-ink">Denne siden finnes ikke.</h1>
      <p className="mx-auto mt-5 max-w-prose text-lead text-ink-faint">
        Lenken kan være utdatert, eller så har siden blitt flyttet.
      </p>
      <Button to="/" size="lg" className="mt-9">
        Tilbake til forsiden
      </Button>
    </div>
  )
}
