import { useProfile } from '../../lib/i18n'

export default function Footer() {
  const profile = useProfile()

  return (
    <footer className="no-print border-t border-[#1c1c28]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="font-display text-sm font-extrabold text-accent-400">{profile.footer.title}</p>
          <p className="text-xs text-slate-500">{profile.footer.subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          {profile.contact.links.map((link) => (
            <a
              key={link.label}
              className="focus-ring text-xs text-slate-500 transition-colors hover:text-accent-400"
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
