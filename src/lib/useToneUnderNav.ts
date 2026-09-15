import { useEffect, useState } from 'react'

/**
 * Sier fra når en mørk seksjon ligger rett under den faste navigasjonen.
 *
 * Uten dette blir den lyse navlinjen stående som en hvit stripe oppå de
 * kullsvarte seksjonene. Apple bytter nav-fargen på samme måte.
 *
 * Teknikken: en IntersectionObserver med negative marger, slik at «roten»
 * krymper til et tynt bånd rett under navlinjen. Treffer en mørk seksjon
 * båndet, er den det man ser bak navigasjonen.
 */
export function useDarkSectionUnderNav(): boolean {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    let observer: IntersectionObserver | null = null
    const dark = new Set<Element>()

    const connect = () => {
      observer?.disconnect()
      const navHeight =
        parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) ||
        52
      const bottom = Math.max(0, window.innerHeight - navHeight - 4)

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) dark.add(entry.target)
            else dark.delete(entry.target)
          }
          setIsDark(dark.size > 0)
        },
        { rootMargin: `-${navHeight}px 0px -${bottom}px 0px`, threshold: 0 },
      )

      dark.clear()
      document.querySelectorAll('[data-tone="dark"]').forEach((node) => observer?.observe(node))
    }

    connect()

    // Seksjoner monteres etter hvert som ruter bytter, og båndet må regnes
    // på nytt når vinduet endrer høyde.
    const mutations = new MutationObserver(connect)
    mutations.observe(document.body, { childList: true, subtree: true })
    window.addEventListener('resize', connect)

    return () => {
      observer?.disconnect()
      mutations.disconnect()
      window.removeEventListener('resize', connect)
    }
  }, [])

  return isDark
}
