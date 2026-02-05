import { useState } from 'react'
import { Mail, MessageCircle, Github, Phone } from 'lucide-react'
import { profile } from '../content/profile'
import SectionHeader from '../components/ui/SectionHeader'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import CopyButton from '../components/ui/CopyButton'
import Reveal from '../components/sections/Reveal'

const iconMap = {
  GitHub: Github,
  Discord: MessageCircle,
  Email: Mail,
  Phone: Phone,
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle',
  )
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!accessKey) {
      setStatus('error')
      return
    }

    setStatus('sending')
    const payload = {
      access_key: accessKey,
      subject: profile.contact.form.subject,
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
    }

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) throw new Error('submit_failed')
        setStatus('success')
        setForm({ name: '', email: '', phone: '', message: '' })
      })
      .catch(() => {
        setStatus('error')
      })
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-20">
      <SectionHeader title={profile.contact.title} subtitle={profile.contact.subtitle} />

      <Reveal className="mt-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <h3 className="text-lg font-semibold text-white">{profile.contact.cardTitle}</h3>
            <p className="mt-2 text-sm text-slate-400">{profile.contact.cardSubtitle}</p>
            <div className="mt-6 space-y-4">
              {profile.contact.links.map((link) => {
                const Icon = iconMap[link.label as keyof typeof iconMap] ?? Mail
                return (
                  <div
                    key={link.label}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                    className="focus-ring flex items-center gap-2 rounded-full px-2 py-1 text-sm text-slate-200"
                    >
                      <Icon size={16} /> {link.value}
                    </a>
                    <CopyButton
                      value={link.value}
                      label={profile.contact.copyLabel}
                      copiedLabel={profile.contact.copiedLabel}
                    />
                  </div>
                )
              })}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-white">{profile.contact.title}</h3>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <label className="block text-sm text-slate-300">
                {profile.contact.form.nameLabel}
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="focus-ring mt-2 w-full rounded-xl border border-white/10 bg-base-950/70 px-4 py-2 text-sm text-white"
                  required
                />
              </label>
              <label className="block text-sm text-slate-300">
                {profile.contact.form.emailLabel}
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  className="focus-ring mt-2 w-full rounded-xl border border-white/10 bg-base-950/70 px-4 py-2 text-sm text-white"
                  required
                />
              </label>
              <label className="block text-sm text-slate-300">
                {profile.contact.form.phoneLabel}
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                  placeholder={profile.contact.form.phonePlaceholder}
                  className="focus-ring mt-2 w-full rounded-xl border border-white/10 bg-base-950/70 px-4 py-2 text-sm text-white"
                />
              </label>
              <label className="block text-sm text-slate-300">
                {profile.contact.form.messageLabel}
                <textarea
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  className="focus-ring mt-2 min-h-[140px] w-full rounded-xl border border-white/10 bg-base-950/70 px-4 py-2 text-sm text-white"
                  placeholder={profile.contact.form.messagePlaceholder}
                  required
                />
              </label>
              <Button type="submit" disabled={status === 'sending'}>
                {status === 'sending'
                  ? profile.contact.form.sendingLabel
                  : profile.contact.form.sendLabel}
              </Button>
              {status === 'success' ? (
                <p className="text-xs text-teal-300">
                  {profile.contact.form.successMessage}
                </p>
              ) : null}
              {status === 'error' ? (
                <p className="text-xs text-rose-300">
                  {profile.contact.form.errorMessage}
                </p>
              ) : null}
              <p className="text-xs text-slate-400">{profile.contact.form.note}</p>
            </form>
          </Card>
        </div>
      </Reveal>
    </div>
  )
}
