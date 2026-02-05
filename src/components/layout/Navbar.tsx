import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { profile } from '../../content/profile'
import { cn } from '../../lib/utils'
import Button from '../ui/Button'
import { buttonStyles } from '../ui/buttonStyles'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const brandName = profile.brand?.name ?? profile.name

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-base-950/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="focus-ring flex items-center rounded-full">
          <div className="hidden text-base font-semibold tracking-[0.22em] text-slate-100 sm:block">
            {brandName}
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {profile.navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'focus-ring rounded-full px-2 py-1 text-sm font-medium text-slate-300 transition-colors hover:text-white',
                  isActive && 'text-white',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href={profile.links.github}
            className={buttonStyles({ variant: 'secondary', size: 'sm' })}
            target="_blank"
            rel="noreferrer"
          >
            {profile.labels.githubLabel}
          </a>
        </nav>

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            aria-label={profile.labels.toggleNavLabel}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden"
          >
            <div className="mx-6 rounded-2xl border border-white/10 bg-base-950/95 p-5 shadow-soft">
              <div className="flex flex-col gap-4">
                {profile.navigation.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'focus-ring rounded-full px-2 py-1 text-sm font-medium text-slate-300 transition-colors hover:text-white',
                        isActive && 'text-white',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonStyles({ variant: 'secondary', size: 'sm' })}
                >
                  {profile.labels.githubLabel}
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
