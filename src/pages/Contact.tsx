import { useEffect, useState } from 'react'
import { business, contactPage } from '../content/site'
import { sendContact } from '../lib/contact'
import { messagingChannels } from '../lib/messaging'
import { cn } from '../lib/utils'
import Reveal from '../components/ui/Reveal'

type Status = 'idle' | 'sending' | 'success' | 'error'

const field =
  'w-full rounded-md border border-hairline-strong bg-elevated px-4 py-3 text-[16px] text-fg outline-none transition-colors placeholder:text-fg-faint focus:border-fg'

export default function Contact() {
  const channels = messagingChannels()
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [mailto, setMailto] = useState('')
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
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

    const result = await sendContact(form)
    if (result.ok) {
      setStatus('success')
      return
    }
    setError(result.error || contactPage.form.errorBody)
    setMailto(result.mailto ?? '')
    setStatus('error')
  }

  if (status === 'success') {
    return (
      <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-positive/10">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-positive" aria-hidden="true">
            <path fill="currentColor" d="M9.3 17.6 4 12.3l1.6-1.6 3.7 3.7L18.4 5l1.6 1.6z" />
          </svg>
        </div>
        <h1 className="mt-7 text-headline text-fg">{contactPage.form.successTitle}</h1>
        <p className="mx-auto mt-4 max-w-prose text-[17px] leading-relaxed text-fg-faint">
          {contactPage.form.successBody}
        </p>
      </div>
    )
  }

  return (
    <div className="shell pb-28 pt-[calc(var(--nav-height)+80px)]">
      <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <h1 className="text-display text-fg">{contactPage.title}</h1>
          <p className="mt-5 text-lead text-fg-faint">{contactPage.lead}</p>

          <dl className="mt-10 space-y-5 border-t border-hairline pt-8">
            <div>
              <dt className="text-[14px] font-semibold text-fg-faint">E-post</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${business.email}`}
                  className="text-[17px] text-fg hover:text-accent"
                >
                  {business.email}
                </a>
              </dd>
            </div>
            {channels.length > 0 ? (
              <div>
                <dt className="text-[14px] font-semibold text-fg-faint">Melding (raskest svar)</dt>
                <dd className="mt-1 text-[17px] text-fg">{business.mobileLabel}</dd>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {channels.map((channel) => (
                    <a
                      key={channel.id}
                      href={channel.href}
                      target={channel.href.startsWith('http') ? '_blank' : undefined}
                      rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="rounded-md border border-hairline-strong px-3.5 py-2 text-[14px] font-medium text-fg-soft transition hover:border-fg hover:text-fg"
                    >
                      {channel.label}
                    </a>
                  ))}
                </dd>
              </div>
            ) : null}
            <div>
              <dt className="text-[14px] font-semibold text-fg-faint">Sted</dt>
              <dd className="mt-1 text-[17px] text-fg">{business.city}, Norge</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="rounded-panel border border-hairline bg-elevated p-6 shadow-card sm:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-[14px] font-medium text-fg-soft">
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
                <span className="mb-1.5 block text-[14px] font-medium text-fg-soft">
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
                <span className="mb-1.5 block text-[14px] font-medium text-fg-soft">
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
                <span className="mb-1.5 block text-[14px] font-medium text-fg-soft">
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
              <span className="mb-1.5 block text-[14px] font-medium text-fg-soft">
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
              <div
                role="alert"
                className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-800"
              >
                <p>{error}</p>
                {/* Siste utvei: gi den besøkende teksten sin tilbake i et
                    ferdig utfylt e-postutkast, framfor en blindvei. */}
                {mailto ? (
                  <a
                    href={mailto}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-red-800 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-red-900"
                  >
                    Åpne meldingen i e-postprogrammet ditt
                  </a>
                ) : null}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-7 w-full rounded-md bg-accent-solid px-7 py-4 text-[17px] font-semibold text-blekk transition hover:bg-[#ff6d38] disabled:opacity-50"
            >
              {status === 'sending' ? contactPage.form.sending : contactPage.form.submit}
            </button>

            <p className="mt-4 text-center text-[13px] text-fg-faint">{contactPage.form.consent}</p>
          </form>
        </Reveal>
      </div>
    </div>
  )
}
