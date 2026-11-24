/**
 * Alt redaksjonelt innhold på firix.no.
 *
 * Dette er den eneste filen du trenger å endre for å endre tekst på siden.
 * Prosjektene ligger IKKE her — de styres fra /admin (se src/content/projects.ts
 * for fallback-listen som vises hvis API-et er nede).
 */

/* ------------------------------------------------------------------ *
 * ⚠️  FYLL INN — DISSE VERDIENE ER PLACEHOLDERE
 *
 * Ingenting her er oppdiktet på dine vegne. Tomme strenger skjuler
 * elementet på siden i stedet for å vise noe usant. Bytt ut og deploy.
 * ------------------------------------------------------------------ */
export type Business = {
  legalName: string
  orgNumber: string
  vatRegistered: boolean
  city: string
  email: string
  /** Mobilnummer i internasjonalt format uten mellomrom. Tom = skjuler alle
   *  meldingskanalene. */
  mobile: string
  /** Samme nummer, skrevet slik det leses. */
  mobileLabel: string
  /** Slå av en kanal du ikke bruker, så forsvinner knappen. */
  messaging: { sms: boolean; whatsapp: boolean; telegram: boolean; discord: boolean }
  contactName: string
  linkedin: string
  github: string
  discord: string
  discordHandle: string
  responseTime: string
}

export const business: Business = {
  /** Juridisk navn slik det står i Brønnøysundregistrene. */
  legalName: 'Firix',
  /** 9 siffer. Tom streng = org.nr skjules i footeren. */
  orgNumber: '',
  /** true når du faktisk er MVA-registrert. */
  vatRegistered: true,
  city: 'Tønsberg',
  email: 'michael@firix.no',
  /**
   * Nummeret brukes bevisst kun til melding, ikke til ringing — derfor er det
   * ingen tel:-lenke noe sted.
   */
  mobile: '+4793010275',
  mobileLabel: '930 10 275',
  messaging: { sms: true, whatsapp: true, telegram: true, discord: true },
  contactName: 'Michael Firing',
  linkedin: 'https://www.linkedin.com/in/michaelfiring/',
  github: 'https://github.com/KevinRyans',
  /** Profil-URL med bruker-ID, og navnet slik det vises. */
  discord: 'https://discord.com/users/337288161094795294',
  discordHandle: 'onyxnor',
  /** Hvor raskt du realistisk svarer. Ikke lov noe du ikke holder. */
  responseTime: 'innen 24 timer',
}

/* ------------------------------------------------------------------ *
 * SIDEINNHOLD
 * ------------------------------------------------------------------ */
export const nav = [
  { label: 'Tjenester', to: '/#tjenester' },
  { label: 'Prosjekter', to: '/prosjekter' },
  { label: 'Om meg', to: '/#om' },
]

/**
 * Lagene i stabelen øverst på forsiden. Rekkefølgen er ovenfra og ned:
 * det kunden ser, det som driver det, og det det kjører på. Samme lag
 * går igjen i tjenestelisten, så illustrasjonen og teksten forklarer
 * hverandre.
 */
export type Layer = 'site' | 'app' | 'server'

export const hero = {
  byline: 'Michael Firing, utvikler i Tønsberg',
  title: ['Nettsider, webapper', 'og teknisk drift.'],
  lead: 'Jeg bygger nettsider og verktøy for bedrifter, og tar hånd om serverne de kjører på. Hva trenger du hjelp med?',
  primaryCta: { label: 'Send en forespørsel', to: '/kontakt' },
  secondaryCta: { label: 'Se prosjekter', to: '/#arbeid' },
  layers: [
    { id: 'site', label: 'Nettsiden', note: 'Det kundene dine ser' },
    { id: 'app', label: 'Appen', note: 'Det de ansatte bruker' },
    { id: 'server', label: 'Serveren', note: 'Det alt kjører på' },
  ] satisfies { id: Layer; label: string; note: string }[],
}

export const services = {
  title: 'Hva kan jeg hjelpe deg med?',
  lead: 'Hele veien fra skjermen til serveren. Du kan kjøpe ett lag, eller alle tre.',
  items: [
    {
      layer: 'site',
      title: 'Nettsider',
      body: 'Bedriftsprofiler, landingssider og kampanjesider som laster raskt, ser like bra ut på mobil og rangerer i Google. Bygget for å konvertere besøkende til henvendelser.',
      points: ['Responsivt design', 'Teknisk SEO', 'Kontaktskjema og sporing'],
    },
    {
      layer: 'app',
      title: 'Webapplikasjoner',
      body: 'Interne verktøy, kundeportaler, booking- og bestillingssystemer. Vi kartlegger arbeidsflyten først, så bygger jeg noe de ansatte faktisk vil bruke.',
      points: ['Innlogging og roller', 'Database og API', 'Integrasjoner'],
    },
    {
      layer: 'server',
      title: 'Drift og infrastruktur',
      body: 'En nettside er ikke ferdig når den lanseres. Jeg setter opp hosting, domener og servere, og håndterer innhold, sikkerhetsoppdateringer, overvåking og nye funksjoner etter behov. Du trenger ikke finne en til for den delen.',
      points: ['Hosting, domener og servere', 'Overvåking og oppetid', 'Sikkerhetsoppdateringer'],
    },
  ] satisfies { layer: Layer; title: string; body: string; points: string[] }[],
}

export const about = {
  title: 'Hvem du snakker med.',
  body: [
    'Jeg heter Michael, er 25 år og holder til i Tønsberg. Jeg lanserte min første nettside i 2011, som elleveåring, og har holdt på siden. Det som begynte som egne prosjekter ble etter hvert oppdrag for andre.',
    'Det er ikke bare nettsider. Jeg setter opp og drifter servere og infrastrukturen rundt dem, håndterer hosting og domener, og har bakgrunn fra teknisk drift med ansvar for anlegg, samsvar og leverandører. Det betyr at jeg forstår hva som skjer etter lansering — ikke bare hvordan man bygger noe som ser bra ut på skjermen.',
    'Når du leier meg, er det meg du får. Ingen prosjektleder som videreformidler, ingen selger som lover noe utvikleren ikke har sagt ja til. Du snakker med den som skriver koden, fra første samtale til siden er live.',
  ],
  facts: [
    { value: 'Siden 2011', label: 'Bygget for nett' },
    { value: 'Tønsberg', label: 'Base — jobber i hele Norge' },
    { value: 'Null', label: 'Mellomledd mellom deg og koden' },
  ],
  portrait: '/images/michael.webp',
  portraitAlt: 'Michael, utvikleren bak Firix',
}

export const work = {
  title: 'Utvalgte prosjekter.',
  lead: 'Se hva jeg har bygget og utforsk nettstedene selv.',
  emptyState: 'Prosjektene legges ut fortløpende. Ta kontakt for referanser i mellomtiden.',
  seeAll: 'Se alle prosjekter',
}

export const process = {
  title: 'Slik foregår det.',
  lead: 'Fire steg. Ingen overraskelser underveis.',
  steps: [
    {
      title: 'Samtale',
      body: 'Vi bruker 30 minutter på hva du trenger og hvorfor. Gratis og uforpliktende. Er jeg feil person for jobben, sier jeg det.',
    },
    {
      title: 'Forslag',
      body: 'Du får et skriftlig forslag med hva jeg kan bygge, hva jeg trenger fra deg og når det kan være klart.',
    },
    {
      title: 'Bygging',
      body: 'Du får en lenke til siden fra dag én og ser fremgangen fortløpende. Innspill underveis, ikke en stor avsløring på slutten.',
    },
    {
      title: 'Lansering og drift',
      body: 'Jeg setter opp domene, publisering og analyse. Deretter er jeg tilgjengelig for videre arbeid — uten bindingstid.',
    },
  ],
}

export const faq = {
  title: 'Det bedrifter lurer på.',
  items: [
    {
      q: 'Hva trenger du for å vurdere et oppdrag?',
      a: 'Beskriv hva du vil oppnå og hvem som skal bruke løsningen. Har du en nettside i dag eller en dato å forholde deg til, kan du ta det med.',
    },
    {
      q: 'Hva skjer hvis du blir utilgjengelig?',
      a: 'Du eier koden og alle kontoer fra dag én. Alt ligger i et kodelager du har tilgang til, bygget på standard teknologi (React, TypeScript) som enhver utvikler kan overta. Du blir aldri låst til meg.',
    },
    {
      q: 'Kan jeg oppdatere innholdet selv?',
      a: 'Ja. Fortell meg hva du ønsker å endre selv, så kan vi velge en løsning for tekst, bilder og sider.',
    },
    {
      q: 'Kan du ta over driften av en eksisterende side?',
      a: 'Send meg lenken og fortell hvor siden ligger i dag. Da kan jeg se på oppsettet og vurdere hva jeg kan hjelpe deg med.',
    },
    {
      q: 'Hvor lang tid tar det?',
      a: 'En landingsside tar normalt 1–2 uker, en full bedriftsnettside 2–4 uker. Den vanligste forsinkelsen er ikke koding — det er at innhold og bilder ikke er klare. Vi avtaler frister for begge deler i tilbudet.',
    },
    {
      q: 'Tar du oppdrag utenfor Tønsberg?',
      a: 'Ja. Jeg jobber med bedrifter i hele Norge, og hele prosessen fungerer like godt digitalt. Er du i nærheten, møtes vi gjerne fysisk.',
    },
  ],
}

export const finalCta = {
  title: 'Skal vi ta en prat?',
  lead: 'Send meg noen linjer om oppdraget. Jeg leser forespørselen selv og svarer på hva jeg kan bidra med.',
  cta: { label: 'Send en forespørsel', to: '/kontakt' },
}

export const contactPage = {
  title: 'Fortell meg hva du trenger.',
  lead: `Beskriv prosjektet med dine egne ord. Jeg svarer ${business.responseTime} og tar det videre med deg.`,
  form: {
    name: 'Navn',
    company: 'Bedrift',
    email: 'E-post',
    phone: 'Telefon (valgfritt)',
    message: 'Hva trenger du hjelp med?',
    messagePlaceholder:
      'For eksempel: «Vi er et rørleggerfirma med 6 ansatte og trenger en ny nettside. Den vi har nå er fra 2014 og fungerer dårlig på mobil.»',
    submit: 'Send forespørsel',
    sending: 'Sender …',
    successTitle: 'Takk — henvendelsen er mottatt.',
    successBody: `Jeg svarer ${business.responseTime}. Haster det, send meg en SMS på ${business.mobileLabel} — da er jeg vanligvis raskere.`,
    errorBody: `Noe gikk galt under sendingen. Send gjerne en e-post direkte til ${business.email} i stedet.`,
    consent: 'Opplysningene brukes kun til å besvare henvendelsen din og deles ikke videre.',
  },
}

export const footer = {
  tagline: 'Nettsider og webapplikasjoner for norske bedrifter.',
  rights: 'Alle rettigheter forbeholdt.',
}
