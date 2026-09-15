import { useEffect, useState } from 'react'
import { business, contactPage } from '../content/site'
import { cn } from '../lib/utils'
import Reveal from '../components/ui/Reveal'

type Status = 'idle' | 'sending' | 'success' | 'error'

const field =
  'w-full rounded-xl border border-line bg-surface px-4 py-3 text-[16px] text-ink outline-none transition-colors placeholder:text-ink-ghost focus:border-brand-500'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    budget: contactPage.form.budgetOptions[0],
    message: '',
    // Honeypot: skjult for mennesker, utfylt av enkle bots.
    website: '',
  })

  useEffect(() => {
    document.title = 'Kontakt — Firix'
  }, [])

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setStatus('sending')
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = (await res.json()) as { error?: string }
      if (!res.ok) throw new Error(data.error ?? '')
      setStatus('success')
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : contactPage.form.errorBody)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-positive/10">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-positive" aria-hidden="true">
            <path fill="currentColor" d="M9.3 17.6 4 12.3l1.6-1.6 3.7 3.7L18.4 5l1.6 1.6z" />
          </svg>
        </div>
        <h1 className="mt-7 text-headline font-semibold text-ink">
          {contactPage.form.successTitle}
        </h1>
        <p className="mx-auto mt-4 max-w-prose text-[17px] leading-relaxed text-ink-faint">
          {contactPage.form.successBody}
        </p>
      </div>
    )
  }

  return (
    <div className="shell pb-28 pt-[calc(var(--nav-height)+80px)]">
      <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <p className="text-eyebrow font-semibold uppercase tracking-[0.08em] text-brand-500">
            {contactPage.eyebrow}
          </p>
          <h1 className="mt-4 text-display font-semibold text-ink">{contactPage.title}</h1>
          <p className="mt-5 text-lead text-ink-faint">{contactPage.lead}</p>

          <dl className="mt-10 space-y-5 border-t border-line-soft pt-8">
            <div>
              <dt className="text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-ghost">
                E-post
              </dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${business.email}`}
                  className="text-[17px] text-ink hover:text-brand-500"
                >
                  {business.email}
                </a>
              </dd>
            </div>
            {business.phone ? (
              <div>
                <dt className="text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-ghost">
                  Telefon
                </dt>
                <dd className="mt-1">
                  <a
                    href={`tel:${business.phone.replace(/\s/g, '')}`}
                    className="text-[17px] text-ink hover:text-brand-500"
                  >
                    {business.phone}
                  </a>
                </dd>
              </div>
            ) : null}
            <div>
              <dt className="text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-ghost">
                Sted
              </dt>
              <dd className="mt-1 text-[17px] text-ink">{business.city}, Norge</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="rounded-panel border border-line-soft bg-surface p-7 shadow-card sm:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-[13px] font-medium text-ink-soft">
                  {contactPage.form.name} *
                </span>
                <input
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => set('name')(e.target.value)}
                  className={field}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[13px] font-medium text-ink-soft">
                  {contactPage.form.company}
                </span>
                <input
                  autoComplete="organization"
                  value={form.company}
                  onChange={(e) => set('company')(e.target.value)}
                  className={field}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[13px] font-medium text-ink-soft">
                  {contactPage.form.email} *
                </span>
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => set('email')(e.target.value)}
                  className={field}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[13px] font-medium text-ink-soft">
                  {contactPage.form.phone}
                </span>
                <input
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => set('phone')(e.target.value)}
                  className={field}
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="mb-1.5 block text-[13px] font-medium text-ink-soft">
                {contactPage.form.budget}
              </span>
              <select
                value={form.budget}
                onChange={(e) => set('budget')(e.target.value)}
                className={cn(field, 'appearance-none bg-surface')}
              >
                {contactPage.form.budgetOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-5 block">
              <span className="mb-1.5 block text-[13px] font-medium text-ink-soft">
                {contactPage.form.message} *
              </span>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => set('message')(e.target.value)}
                placeholder={contactPage.form.messagePlaceholder}
                className={cn(field, 'resize-y leading-relaxed')}
              />
            </label>

            {/* Honeypot — skjult for skjermlesere og tastaturbrukere. */}
            <div className="hidden" aria-hidden="true">
              <label>
                Nettside
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => set('website')(e.target.value)}
                />
              </label>
            </div>

            {status === 'error' ? (
              <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-[14px] text-red-700">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-7 w-full rounded-full bg-brand-500 px-7 py-3.5 text-[17px] font-medium text-white transition hover:bg-brand-600 disabled:opacity-50"
            >
              {status === 'sending' ? contactPage.form.sending : contactPage.form.submit}
            </button>

            <p className="mt-4 text-center text-[12px] text-ink-ghost">
              {contactPage.form.consent}
            </p>
          </form>
        </Reveal>
      </div>
    </div>
  )
}
