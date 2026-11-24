import { Link } from 'react-router-dom'
import { business, footer, nav } from '../../content/site'
import { messagingChannels } from '../../lib/messaging'

const link = 'text-[15px] text-fg-soft transition-colors hover:text-fg'

export default function Footer() {
  const year = new Date().getFullYear()
  const channels = messagingChannels()

  return (
    <footer data-tone="ink" className="border-t border-hairline bg-ground text-fg">
      <div className="shell py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-[25px] font-extrabold leading-none tracking-[-0.05em] text-fg">
              firix<span className="text-accent">.</span>
            </p>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-fg-faint">
              {footer.tagline}
            </p>
          </div>

          <nav aria-label="Bunnmeny">
            <h2 className="text-[13px] font-semibold text-accent">Innhold</h2>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.to}>
                  <a href={item.to} className={link}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/kontakt" className={link}>
                  Kontakt
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-[13px] font-semibold text-accent">Kontakt</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={`mailto:${business.email}`} className={link}>
                  {business.email}
                </a>
              </li>
              {channels.map((channel) => (
                <li key={channel.id}>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                    rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
                    className={link}
                  >
                    {channel.label} <span className="text-fg-faint">{channel.hint}</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={business.linkedin} target="_blank" rel="noreferrer" className={link}>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-hairline pt-6 text-[13px] text-fg-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.legalName}. {footer.rights}
          </p>
          {/* Org.nr er det sterkeste tillitssignalet en liten aktør har overfor
              bedriftskunder, men kun når det faktisk er utfylt. «MVA» skrives
              etter nummeret, slik Brønnøysund-konvensjonen er. */}
          <p>
            {business.orgNumber
              ? `Org.nr. ${business.orgNumber}${business.vatRegistered ? ' MVA' : ''}, `
              : ''}
            {business.city}
          </p>
        </div>
      </div>
    </footer>
  )
}
