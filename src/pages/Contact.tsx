import { useEffect, useState } from 'react'
import { Mail, Github, Phone, Check } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { AnimatePresence, motion } from 'framer-motion'
import { useProfile } from '../lib/i18n'
import SectionHeader from '../components/ui/SectionHeader'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import CopyButton from '../components/ui/CopyButton'
import Reveal from '../components/sections/Reveal'

function DiscordIcon({
  className,
  size = 16,
}: {
  className?: string
  size?: number
}) {
  return (
    <FontAwesomeIcon
      icon={faDiscord}
      className={className}
      style={{ fontSize: size }}
      aria-hidden="true"
    />
  )
}

const iconMap = {
  github: Github,
  discord: DiscordIcon,
  email: Mail,
  phone: Phone,
}

export default function Contact() {
  const profile = useProfile()
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
                const Icon = iconMap[link.type as keyof typeof iconMap] ?? Mail
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
                      <Icon size={16} className="text-slate-200" /> {link.value}
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
