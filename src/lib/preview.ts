/**
 * Automatiske skjermbilder av kundenettsteder.
 *
 * En iframe kan blokkeres av nettstedet selv, og det kan ikke oppdages fra
 * nettleseren. Et skjermbilde tas av en tjeneste utenfor nettleseren og er
 * bare et bilde når det kommer hit — det kan ikke blokkeres, det spiser ikke
 * scrolling, og det laster raskere enn et helt nettsted.
 *
 * Kildene prøves i rekkefølge. Feiler én, går `<img>`-elementet videre til
 * neste, og til slutt til det formgitte kortet.
 */

/** Bredden nettstedet gjengis i før nedskalering. */
export const SHOT_WIDTH = 1200
export const SHOT_HEIGHT = 750

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

/**
 * WordPress' egen skjermbildetjeneste. Gratis, uten nøkkel, og bygget for å
 * tåle trafikken til wordpress.com — derfor brukes den som reserve direkte
 * fra nettleseren når siden ligger på en host uten backend.
 */
export function mshotsUrl(target: string, width = SHOT_WIDTH): string {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(target)}?w=${width}&h=${Math.round(
    (width * SHOT_HEIGHT) / SHOT_WIDTH,
  )}`
}

/**
 * Stien der GitHub Actions legger skjermbildet den tar av prosjektet.
 * Se scripts/capture-previews.mjs og .github/workflows/previews.yml.
 */
export function capturedPath(slug: string): string {
  return `/previews/${slug}.jpg`
}

/**
 * Kildene for et automatisk skjermbilde, i prioritert rekkefølge.
 *
 * 1. Bildet GitHub Actions har tatt og lagt i repoet. Ligger på vårt eget
 *    domene, er allerede ferdig, og koster ingen ekstern forespørsel.
 *    Finnes det ikke ennå, svarer serveren 404 og vi går videre.
 * 2. Vårt eget endepunkt, som henter bildet på serveren og lar Vercel cache
 *    det. Da ser ikke besøkende hvilken tjeneste som brukes.
 * 3. Tjenesten direkte, for når siden kjører på en host uten backend.
 */
export function screenshotSources(target: string, slug: string, width = SHOT_WIDTH): string[] {
  const sources: string[] = []
  if (slug) sources.push(capturedPath(slug))
  if (isHttpUrl(target)) {
    sources.push(`/api/screenshot?url=${encodeURIComponent(target)}&w=${width}`)
    sources.push(mshotsUrl(target, width))
  }
  return sources
}
