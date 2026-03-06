import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLanguage, useProfile } from '../../lib/i18n'
import { cn } from '../../lib/utils'
import Button from '../ui/Button'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const profile = useProfile()
  const { language, setLanguage } = useLanguage()
  const brandName = profile.brand?.name ?? profile.name

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'focus-ring relative rounded-[2px] px-2 py-1 text-[0.67rem] uppercase tracking-[0.14em] font-mono transition-colors',
      isActive
        ? 'text-accent-400 after:absolute after:bottom-[-3px] after:left-0 after:right-0 after:h-px after:bg-accent-400'
        : 'text-slate-500 hover:text-accent-400',
    )

  return (
    <header className="no-print fixed top-0 z-50 w-full border-b border-[#1c1c28] bg-[rgba(9,9,14,0.9)] backdrop-blur-[18px]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <Link to="/" className="focus-ring flex items-center rounded-sm">
          <span className="font-display text-[0.95rem] font-extrabold tracking-[0.02em] text-accent-400">
            {brandName}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {profile.navigation.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Status badge */}
          <div className="flex items-center gap-2 rounded-full border border-accent-400/20 bg-accent-400/5 px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulseRing absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
            </span>
            <span className="font-mono text-[0.65rem] tracking-[0.08em] text-slate-500">Tilgjengelig</span>
          </div>

          {/* Language toggle */}
          <div style={{ display: 'flex', border: '1px solid #242434', borderRadius: '4px', overflow: 'hidden' }}>
            {(['en', 'no'] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setLanguage(option)}
                className={cn(
                  'focus-ring border-0 font-mono text-[0.67rem] uppercase tracking-[0.14em] transition-all duration-200 px-[0.65rem] py-[0.28rem]',
                  language === option
                    ? 'bg-accent-400 text-base-950'
                    : 'bg-transparent text-slate-500 hover:text-white',
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile toggle */}
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

      {/* Mobile drawer */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden"
          >
            <div className="mx-4 mb-4 rounded-2xl border border-white/10 bg-base-900/95 p-5 shadow-soft backdrop-blur-xl">
              <div className="flex flex-col gap-1">
                {profile.navigation.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-accent-400/10 text-accent-400'
                          : 'text-slate-400 hover:bg-white/5 hover:text-slate-100',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-pulseRing absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
                    </span>
                    <span className="font-mono text-[0.65rem] text-slate-500">Tilgjengelig</span>
                  </div>
                  <div style={{ display: 'flex', border: '1px solid #242434', borderRadius: '4px', overflow: 'hidden' }}>
                    {(['en', 'no'] as const).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setLanguage(option)}
                        className={cn(
                          'focus-ring border-0 font-mono text-[0.67rem] uppercase tracking-[0.14em] transition-all duration-200 px-[0.65rem] py-[0.28rem]',
                          language === option
                            ? 'bg-accent-400 text-base-950'
                            : 'bg-transparent text-slate-500 hover:text-white',
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
