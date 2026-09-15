import { Link } from 'react-router-dom'
import { business, footer, nav } from '../../content/site'
import { messagingChannels } from '../../lib/messaging'

export default function Footer() {
  const year = new Date().getFullYear()
  const channels = messagingChannels()

  return (
    <footer data-tone="muted" className="border-t border-hairline bg-ground text-fg">
      <div className="shell py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-[17px] font-semibold tracking-[-0.02em] text-fg">Firix</p>
            <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-fg-faint">
              {footer.tagline}
            </p>
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-fg-faint">
              Innhold
            </p>
            <ul className="mt-3 space-y-2">
              {nav.map((item) => (
                <li key={item.to}>
                  <a href={item.to} className="text-[13px] text-fg-soft hover:text-fg">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/prosjekter" className="text-[13px] text-fg-soft hover:text-fg">
                  Prosjekter
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="text-[13px] text-fg-soft hover:text-fg">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-fg-faint">
              Kontakt
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={`mailto:${business.email}`}
                  className="text-[13px] text-fg-soft hover:text-fg"
                >
                  {business.email}
                </a>
              </li>
              {channels.map((channel) => (
                <li key={channel.id}>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                    rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="text-[13px] text-fg-soft hover:text-fg"
                  >
                    {channel.label} {channel.hint}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={business.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13px] text-fg-soft hover:text-fg"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-hairline-strong pt-6 text-[12px] text-fg-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.legalName}. {footer.rights}
          </p>
          {/* Org.nr og MVA er de sterkeste tillitssignalene en liten aktør har
              overfor bedriftskunder — men kun hvis de faktisk er utfylt. */}
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {business.orgNumber ? <span>Org.nr {business.orgNumber}</span> : null}
            {business.orgNumber && business.vatRegistered ? (
              <span aria-hidden="true">·</span>
            ) : null}
            {business.vatRegistered ? <span>MVA-registrert</span> : null}
            {business.city ? <span aria-hidden="true">·</span> : null}
            {business.city ? <span>{business.city}</span> : null}
          </p>
        </div>
      </div>
    </footer>
  )
}
