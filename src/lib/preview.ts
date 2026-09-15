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
 * Kildene for et automatisk skjermbilde, i prioritert rekkefølge.
 *
 * 1. Vårt eget endepunkt, som henter bildet på serveren og lar Vercel cache
 *    det. Da ser ikke besøkende hvilken tjeneste som brukes, og tjenesten
 *    treffes sjelden.
 * 2. Tjenesten direkte, for når siden kjører på en host uten backend.
 */
export function screenshotSources(target: string, width = SHOT_WIDTH): string[] {
  if (!isHttpUrl(target)) return []
  return [`/api/screenshot?url=${encodeURIComponent(target)}&w=${width}`, mshotsUrl(target, width)]
}
