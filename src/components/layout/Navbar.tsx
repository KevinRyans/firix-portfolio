import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { nav } from '../../content/site'
import { useDarkSectionUnderNav } from '../../lib/useToneUnderNav'
import { cn } from '../../lib/utils'

/**
 * Fast navigasjon. Halvgjennomsiktig med blur, og bytter til mørk tone når en
 * mørk seksjon ligger under den. Den eneste fargen er kontaktknappen.
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
        overDark && !open ? 'bg-fjord-deep/80' : 'bg-fjell/80',
        scrolled || open
          ? 'border-b border-hairline backdrop-blur-xl backdrop-saturate-150'
          : 'border-b border-transparent backdrop-blur-md',
      )}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <nav className="shell flex h-[var(--nav-height)] items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-[24px] font-bold leading-none tracking-[-0.05em] text-fg transition-colors duration-500"
          aria-label="Firix, til forsiden"
        >
          <img src="/favicon.svg" alt="" width={30} height={30} className="rounded-[7px]" />
          firix
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
            className="rounded-md bg-accent-solid px-4 py-2.5 text-[14px] font-semibold text-blekk transition duration-300 hover:bg-[#ff6d38]"
          >
            Send en forespørsel
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
                className="mt-4 rounded-md bg-accent-solid px-5 py-3.5 text-center text-[16px] font-semibold text-blekk"
              >
                Send en forespørsel
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
