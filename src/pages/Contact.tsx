import { useEffect, useState } from 'react'
import { Mail, Github, Phone, Check } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../content/profile'
import SectionHeader from '../components/ui/SectionHeader'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import CopyButton from '../components/ui/CopyButton'
import Reveal from '../components/sections/Reveal'

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 256 199"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M216.9 16.5A208.4 208.4 0 0 0 164.5 0c-2.3 4.2-4.9 9.9-6.7 14.4a191 191 0 0 0-57.7 0c-1.8-4.5-4.5-10.2-6.8-14.4a208.4 208.4 0 0 0-52.4 16.5C7.7 65.6-4.8 113.3 1.5 160.2c26.6 19.7 52.4 31.7 77.8 39.5 6.3-8.6 11.9-17.8 16.9-27.5a135.6 135.6 0 0 1-26.7-12.8c2.2-1.6 4.4-3.3 6.5-5 51.5 24.2 107.5 24.2 158.4 0 2.1 1.7 4.3 3.4 6.5 5a168.4 168.4 0 0 1-26.8 12.8 181 181 0 0 0 16.9 27.5c25.4-7.8 51.2-19.8 77.8-39.5 7.7-57.1-12.5-104.6-39.1-143.7ZM86.3 134.6c-13.3 0-24.2-12.2-24.2-27.2 0-15 10.7-27.2 24.2-27.2 13.4 0 24.3 12.2 24.2 27.2 0 15-10.7 27.2-24.2 27.2Zm83.4 0c-13.3 0-24.2-12.2-24.2-27.2 0-15 10.7-27.2 24.2-27.2 13.4 0 24.3 12.2 24.2 27.2 0 15-10.7 27.2-24.2 27.2Z"
      />
    </svg>
  )
}

const iconMap = {
  GitHub: Github,
  Discord: DiscordIcon,
  Email: Mail,
  Phone: Phone,
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle',
  )
  const [showToast, setShowToast] = useState(false)
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

  useEffect(() => {
    if (status !== 'success') return
    setShowToast(true)
    const timer = window.setTimeout(() => setShowToast(false), 4200)
    return () => window.clearTimeout(timer)
  }, [status])

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
              <AnimatePresence>
                {showToast ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="mt-3 flex items-center gap-3 rounded-xl border border-teal-400/30 bg-teal-500/10 px-4 py-3 text-sm text-teal-100"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-400/20 text-teal-200">
                      <Check size={16} />
                    </span>
                    <span>{profile.contact.form.successMessage}</span>
                  </motion.div>
                ) : null}
              </AnimatePresence>
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
