import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { nav } from '../../content/site'
import { cn } from '../../lib/utils'

/**
 * Apple-stil global nav: 52px høy, gjennomsiktig med kraftig blur, og en
 * hårfin linje som først dukker opp når man har scrollet.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-apple',
        scrolled || open
          ? 'border-b border-line-soft/80 bg-canvas/80 backdrop-blur-xl backdrop-saturate-150'
          : 'border-b border-transparent bg-canvas/60 backdrop-blur-md',
      )}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <nav className="shell flex h-[var(--nav-height)] items-center justify-between">
        <Link
          to="/"
          className="text-[19px] font-semibold tracking-[-0.02em] text-ink"
          aria-label="Firix — til forsiden"
        >
          Firix
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.to}
              href={item.to}
              className="text-[13px] text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/kontakt"
            className="rounded-full bg-brand-500 px-4 py-1.5 text-[13px] font-medium text-white transition hover:bg-brand-600"
          >
            Få et tilbud
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={open ? 'Lukk meny' : 'Åpne meny'}
          className="-mr-2 flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={cn(
                'absolute left-0 h-[1.5px] w-4 bg-ink transition-all duration-300 ease-apple',
                open ? 'top-1.5 rotate-45' : 'top-0',
              )}
            />
            <span
              className={cn(
                'absolute left-0 h-[1.5px] w-4 bg-ink transition-all duration-300 ease-apple',
                open ? 'top-1.5 -rotate-45' : 'top-3',
              )}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.28, 0.11, 0.32, 1] }}
            className="overflow-hidden md:hidden"
          >
            <div className="shell flex flex-col gap-1 pb-6 pt-2">
              {nav.map((item) => (
                <a
                  key={item.to}
                  href={item.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-line-soft py-3.5 text-[19px] font-medium text-ink"
                >
                  {item.label}
                </a>
              ))}
              <Link
                to="/kontakt"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-full bg-brand-500 px-5 py-3 text-center text-[16px] font-medium text-white"
              >
                Få et tilbud
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
