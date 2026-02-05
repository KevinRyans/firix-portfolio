import { Github, Mail, MessageCircle, Phone } from 'lucide-react'
import { profile } from '../../content/profile'

const iconMap = {
  GitHub: Github,
  Discord: MessageCircle,
  Email: Mail,
  Phone: Phone,
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-base-950/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-white">{profile.footer.title}</p>
          <p className="text-sm text-slate-400">{profile.footer.subtitle}</p>
          <p className="text-xs text-slate-500">{profile.footer.note}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
          {profile.contact.links.map((link) => {
            const Icon = iconMap[link.label as keyof typeof iconMap] ?? Mail
            return (
              <a
                key={link.label}
                className="focus-ring inline-flex items-center gap-2 rounded-full px-3 py-2 transition hover:text-white"
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                <Icon size={16} /> {link.label}
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
