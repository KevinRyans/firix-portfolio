/**
 * Prosjektmodellen.
 *
 * Sannheten ligger i Vercel KV og redigeres fra /admin. Listen nedenfor er
 * fallback: den vises hvis API-et er nede eller ikke er satt opp ennå, slik
 * at forsiden aldri står tom foran en potensiell kunde.
 */

export type PreviewMode = 'auto' | 'image' | 'live'

export type CuratedProject = {
  /** Stabil id. Endres aldri etter opprettelse — brukes som nøkkel i KV. */
  id: string
  /** URL-segment: /prosjekter/<slug> */
  slug: string
  name: string
  /** Kundenavn. Tom = vises som eget prosjekt, ikke som kundeoppdrag. */
  client: string
  /** Kort setning på kortet. Hold den under ~120 tegn. */
  summary: string
  /** Lengre tekst på detaljsiden. Støtter avsnitt separert med blank linje. */
  description: string
  /** Live nettsted. Tom = ingen «Åpne»-knapp. */
  url: string
  repoUrl: string
  previewMode: PreviewMode
  /** Overstyrer hva som lastes i iframen. Tom = bruker `url`. */
  previewUrl: string
  /** Bilde i /public/previews/. Brukes ved previewMode 'image' OG som
   *  fallback hvis en live-preview blokkeres av nettstedet. */
  posterImage: string
  tags: string[]
  year: string
  /** Hva du faktisk gjorde. Vises på detaljsiden. */
  services: string[]
  /** Målbare resultater. Kun ekte tall — tom liste skjuler seksjonen. */
  results: { label: string; value: string }[]
  /** Av/på på nettsiden. Dette er bryteren du styrer fra /admin. */
  visible: boolean
  /** Løftes frem øverst med stor preview. */
  featured: boolean
  /** Lavere tall = tidligere i listen. */
  order: number
}

export function emptyProject(id: string): CuratedProject {
  return {
    id,
    slug: '',
    name: '',
    client: '',
    summary: '',
    description: '',
    url: '',
    repoUrl: '',
    previewMode: 'auto',
    previewUrl: '',
    posterImage: '',
    tags: [],
    year: String(new Date().getFullYear()),
    services: [],
    results: [],
    visible: true,
    featured: false,
    order: 0,
  }
}

export const defaultProjects: CuratedProject[] = [
  {
    ...emptyProject('privatsamleren'),
    slug: 'privatsamleren',
    name: 'Privatsamleren',
    client: 'Privatsamleren',
    summary:
      'Nettside for far og sønn som kjøper løsøre, innbo og dødsbo — bygget for å få telefonen til å ringe.',
    description:
      'Privatsamleren kjøper løsøre, innbo og tar hånd om dødsbo, med kontant oppgjør for gull, sølv, klokker, kunst og militaria. Kundene deres er ofte i en krevende situasjon og trenger å finne riktig telefonnummer raskt.\n\nDerfor er hele siden bygget rundt ett mål: gjøre det åpenbart hva de kjøper, og gjøre det så enkelt som mulig å ta kontakt. Ingen unødvendige steg, tydelig kontaktinformasjon i hver seksjon, og en struktur som fungerer like godt for noen som leser på mobil som på desktop.',
    url: 'https://privatsamleren.no',
    previewMode: 'auto',
    posterImage: '',
    tags: ['Nettside', 'Design', 'SEO'],
    year: '2025',
    services: ['Design', 'Utvikling', 'Teknisk SEO', 'Publisering'],
    results: [],
    visible: true,
    featured: true,
    order: 0,
  },
]
