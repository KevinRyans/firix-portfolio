import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { nav } from '../../content/site'
import { useDarkSectionUnderNav } from '../../lib/useToneUnderNav'
import { cn } from '../../lib/utils'

/**
 * Fast navigasjon, satt som toppen av tegningsarket: papir, en kraftig linje
 * under, og bytter til blåkopi-tone når en mørk seksjon ligger under den.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const overDark = useDarkSectionUnderNav()

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
      data-tone={overDark && !open ? 'dark' : 'light'}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-apple',
        overDark && !open ? 'bg-[#14207a]/90' : 'bg-[#f2f4f6]/90',
        scrolled || open
          ? 'border-b-[1.5px] border-rule backdrop-blur-xl backdrop-saturate-150'
          : 'border-b-[1.5px] border-transparent backdrop-blur-md',
      )}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <nav className="shell flex h-[var(--nav-height)] items-center justify-between">
        <Link
          to="/"
          className="text-[25px] font-extrabold leading-none tracking-[-0.05em] text-fg transition-colors duration-500"
          aria-label="Firix, til forsiden"
        >
          firix<span className="text-accent">.</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.to}
              href={item.to}
              className="text-[15px] text-fg-soft transition-colors duration-500 hover:text-fg"
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/kontakt"
            className="rounded-[2px] bg-fg px-4 py-2.5 text-[14px] font-semibold text-ground transition duration-300 hover:bg-accent-solid hover:text-accent-on"
          >
            Start et prosjekt
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={open ? 'Lukk meny' : 'Åpne meny'}
          className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
        >
          <span className="relative block h-3 w-5">
            <span
              className={cn(
                'absolute left-0 h-[2px] w-5 bg-fg transition-all duration-300 ease-apple',
                open ? 'top-1.5 rotate-45' : 'top-0',
              )}
            />
            <span
              className={cn(
                'absolute left-0 h-[2px] w-5 bg-fg transition-all duration-300 ease-apple',
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
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
          >
            <div className="shell flex flex-col gap-1 pb-6 pt-2">
              {nav.map((item) => (
                <a
                  key={item.to}
                  href={item.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-hairline py-3.5 text-[19px] font-medium text-fg"
                >
                  {item.label}
                </a>
              ))}
              <Link
                to="/kontakt"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-[2px] bg-fg px-5 py-3.5 text-center text-[16px] font-semibold text-ground"
              >
                Start et prosjekt
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
