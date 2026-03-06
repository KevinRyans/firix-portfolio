import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useProfile } from '../lib/i18n'
import CopyButton from '../components/ui/CopyButton'
import Reveal from '../components/sections/Reveal'

export default function Contact() {
  const profile = useProfile()
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle',
  )
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (status !== 'success') return
    setShowToast(true)
    const timer = window.setTimeout(() => setShowToast(false), 4200)
    return () => window.clearTimeout(timer)
  }, [status])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')
    fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(form) })
      .then((r) => { if (!r.ok) throw new Error(); setStatus('success'); setForm({ name: '', email: '', phone: '', message: '' }) })
      .catch(() => setStatus('error'))
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-20">
      <div className="mb-12 pt-2"><p className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-accent-400"><span className="h-px w-6 bg-accent-400/50" />{profile.contact.title}</p><h1 className="font-display text-4xl font-bold text-white md:text-5xl">{profile.contact.subtitle}</h1></div>

      <Reveal className="mt-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="overflow-hidden rounded-[10px] border border-[#1c1c28] bg-base-900"><div className="border-b border-[#1c1c28] px-6 py-5"><p className="font-mono text-[0.63rem] uppercase tracking-[0.12em] text-slate-500">{profile.contact.cardTitle}</p><h3 className="mt-1 font-display text-[1rem] font-bold text-white">{profile.contact.subtitle}</h3></div><div className="py-1">
              {profile.contact.links.map((link) => {
                return (
<div key={link.label} className={"flex items-center justify-between px-4 py-3 transition-colors hover:bg-white/[0.02] " + (profile.contact.links.indexOf(link) < profile.contact.links.length - 1 ? "border-b border-[#1c1c28]" : "")}><div><div className="font-mono text-[0.63rem] uppercase tracking-[0.12em] text-slate-500">{link.label}</div><div className="mt-0.5 text-[0.8rem] text-[var(--text)]">{link.value}</div></div><div className="flex items-center gap-2"><CopyButton value={link.value} label={profile.contact.copyLabel} copiedLabel={profile.contact.copiedLabel} /><a href={link.href} target="_blank" rel="noreferrer" className="font-mono text-[0.8rem] text-slate-500 hover:text-accent-400">↗</a></div></div>
                )
              })}
            </div>
          </div>

          <div className="rounded-[10px] border border-[#1c1c28] bg-base-900 p-6"><h3 className="font-display text-[1rem] font-bold text-white">{profile.contact.title}</h3><form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <label className="block text-sm text-slate-300">
                {profile.contact.form.nameLabel}
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="focus-ring mt-2 w-full rounded-[6px] border border-[#1c1c28] bg-base-900 px-4 py-2 text-sm text-white"
                  required
                />
              </label>
              <label className="block text-sm text-slate-300">
                {profile.contact.form.emailLabel}
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  className="focus-ring mt-2 w-full rounded-[6px] border border-[#1c1c28] bg-base-900 px-4 py-2 text-sm text-white"
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
                  className="focus-ring mt-2 w-full rounded-[6px] border border-[#1c1c28] bg-base-900 px-4 py-2 text-sm text-white"
                />
              </label>
              <label className="block text-sm text-slate-300">
                {profile.contact.form.messageLabel}
                <textarea
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  className="focus-ring mt-2 min-h-[140px] w-full rounded-[6px] border border-[#1c1c28] bg-base-900 px-4 py-2 text-sm text-white"
                  placeholder={profile.contact.form.messagePlaceholder}
                  required
                />
              </label>
              <button type="submit" disabled={status === 'sending'} className="rounded-[4px] bg-accent-400 px-6 py-2 font-mono text-[0.75rem] tracking-[0.06em] text-base-950 transition hover:-translate-y-0.5 hover:bg-accent-300 disabled:opacity-60">
                {status === 'sending'
                  ? profile.contact.form.sendingLabel
                  : profile.contact.form.sendLabel}
              </button>
              <AnimatePresence>
                {showToast ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="mt-3 flex items-center gap-3 rounded-xl border border-accent-400/20 bg-accent-400/5 px-4 py-3 text-sm"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-400/15 text-accent-400">
                      <Check size={16} />
                    </span>
                    <span className="text-accent-300">{profile.contact.form.successMessage}</span>
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
          </div>
        </div>
      </Reveal>
    </div>
  )
}
