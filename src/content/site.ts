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
  /** 9 siffer. Tom streng = org.nr skjules i footer og tillitsraden. */
  orgNumber: '',
  /** true når du faktisk er MVA-registrert. Viser «MVA-registrert» som tillitssignal. */
  vatRegistered: true,
  city: 'Tønsberg',
  email: 'michael@firix.no',
  /**
   * Nummeret brukes bevisst kun til melding, ikke til ringing — derfor er det
   * ingen tel:-lenke noe sted. Det hindrer ikke at noen ringer likevel.
   */
  mobile: '+4793010275',
  mobileLabel: '930 10 275',
  /**
   * Discord står på fordi du ba om det, men vurder den. Overfor et
   * rørleggerfirma signaliserer Discord «gaming og hobby» — nettopp det
   * inntrykket den gamle siden ga. Sett den til false for å skjule den.
   */
  messaging: { sms: true, whatsapp: true, telegram: true, discord: true },
  /** ⚠️ Utledet av LinkedIn-URL-en, ikke bekreftet. Rett opp hvis feil. */
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
 * PRISER — ⚠️ FYLL INN ekte tall
 *
 * `from` er ditt fastpris-utgangspunkt i hele kroner.
 * `agencyFrom` er hva et norsk byrå typisk tar for samme leveranse —
 * bruk et tall du faktisk kan forsvare hvis en kunde spør hvor det kommer fra.
 * Sett `agencyFrom: 0` for å skjule sammenligningen på en pakke.
 * ------------------------------------------------------------------ */
export type PricePackage = {
  id: string
  name: string
  tagline: string
  /** 0 = «Pris på forespørsel» i stedet for et tall. */
  from: number
  /** 0 = skjul sammenligningen mot byråpris. */
  agencyFrom: number
  timeline: string
  bestFor: string
  featured?: boolean
  includes: string[]
}

export const pricing: {
  currency: string
  hourlyRate: number
  vatNote: string
  packages: PricePackage[]
} = {
  currency: 'kr',
  hourlyRate: 0,
  vatNote: 'Alle priser er eks. mva.',
  packages: [
    {
      id: 'landing',
      name: 'Landingsside',
      tagline: 'Én side som selger én ting.',
      from: 0,
      agencyFrom: 0,
      timeline: '1–2 uker',
      bestFor: 'Nytt produkt, kampanje eller enkel bedriftsprofil.',
      includes: [
        'Design tilpasset din profil',
        'Responsivt på mobil, nettbrett og PC',
        'Kontaktskjema rett til innboksen din',
        'Teknisk SEO og Google-indeksering',
        'Publisering og domeneoppsett',
      ],
    },
    {
      id: 'website',
      name: 'Bedriftsnettside',
      tagline: 'En nettside du kan vokse med.',
      from: 0,
      agencyFrom: 0,
      timeline: '2–4 uker',
      bestFor: 'Bedrifter som trenger flere sider, tjenester og innhold.',
      featured: true,
      includes: [
        'Alt i Landingsside',
        'Opptil 8 undersider',
        'Innholdssystem du kan redigere selv',
        'Analyse og konverteringssporing',
        'Ytelsesbudsjett: under 1,5 sekunder lastetid',
        '30 dager med gratis justeringer etter lansering',
      ],
    },
    {
      id: 'webapp',
      name: 'Webapplikasjon',
      tagline: 'Verktøy som gjør jobben, ikke bare viser den.',
      from: 0,
      agencyFrom: 0,
      timeline: '4 uker eller mer',
      bestFor: 'Interne systemer, kundeportaler, booking, dashbord.',
      includes: [
        'Kartlegging av arbeidsflyt før koding',
        'Innlogging og brukerroller',
        'Database og API',
        'Integrasjoner mot systemene dere allerede bruker',
        'Drift, overvåking og support-avtale',
      ],
    },
  ],
}

export const nav = [
  { label: 'Tjenester', to: '/#tjenester' },
  { label: 'Arbeid', to: '/#arbeid' },
  { label: 'Priser', to: '/#priser' },
  { label: 'Prosess', to: '/#prosess' },
]

export const hero = {
  eyebrow: 'Webutvikling for norske bedrifter',
  /**
   * Én streng per linje. På skjermer over 640px tvinges linjeskiftet slik det
   * står her; på mobil flyter linjene sammen og brekkes balansert, fordi et
   * hardt skift der gir enslige ord på egen linje.
   */
  title: ['Din neste kunde', 'finner deg på nett.'],
  lead: 'Jeg bygger raske, gjennomarbeidede nettsider og webapplikasjoner til fastpris — uten byråets prosjektledere, mellomledd og påslag. Du snakker med utvikleren som skriver koden.',
  primaryCta: { label: 'Få et tilbud', to: '/kontakt' },
  secondaryCta: { label: 'Se arbeidet mitt', to: '/#arbeid' },
}

export const trustBar = {
  title: 'Hvorfor bedrifter velger å gå direkte',
  items: [
    {
      stat: 'Fastpris',
      label: 'Du vet hva det koster før vi starter. Ingen timer som løper.',
    },
    {
      stat: 'Én kontakt',
      label: 'Ingen prosjektleder imellom. Du snakker med den som bygger.',
    },
    {
      stat: 'Under 1,5 s',
      label: 'Ytelsesbudsjett på hver leveranse. Trege sider taper kunder.',
    },
  ],
}

export const services = {
  eyebrow: 'Tjenester',
  title: 'Det jeg bygger.',
  lead: 'Tre typer leveranser. Alle med samme krav til hastighet, tilgjengelighet og vedlikehold.',
  items: [
    {
      title: 'Nettsider',
      body: 'Bedriftsprofiler, landingssider og kampanjesider som laster raskt, ser like bra ut på mobil og rangerer i Google. Bygget for å konvertere besøkende til henvendelser.',
      points: ['Responsivt design', 'Teknisk SEO', 'Kontaktskjema og sporing'],
    },
    {
      title: 'Webapplikasjoner',
      body: 'Interne verktøy, kundeportaler, booking- og bestillingssystemer. Vi kartlegger arbeidsflyten først, så bygger jeg noe de ansatte faktisk vil bruke.',
      points: ['Innlogging og roller', 'Database og API', 'Integrasjoner'],
    },
    {
      title: 'Drift og videreutvikling',
      body: 'En nettside er ikke ferdig når den lanseres. Jeg håndterer innhold, sikkerhetsoppdateringer, overvåking og nye funksjoner etter behov.',
      points: ['Overvåking og oppetid', 'Sikkerhetsoppdateringer', 'Løpende forbedringer'],
    },
  ],
}

export const about = {
  eyebrow: 'Om meg',
  title: 'Hvem du snakker med.',
  /**
   * Alderen står her fordi du ba om det. Vurder å fjerne den: den svarer på
   * et spørsmål ingen kunde stilte, og for enkelte kjøpere er den en grunn
   * til å nøle. «Sju år» er tallet som faktisk selger.
   */
  body: [
    'Jeg heter Michael, er 25 år og holder til i Tønsberg. Jeg har bygget ting på nett i sju år — det begynte med egne prosjekter og ble etter hvert oppdrag for andre.',
    'Når du leier meg, er det meg du får. Ingen prosjektleder som videreformidler, ingen selger som lover noe utvikleren ikke har sagt ja til. Du snakker med den som skriver koden, fra første samtale til siden er live.',
  ],
  facts: [
    { value: '7 år', label: 'Med webutvikling' },
    { value: 'Tønsberg', label: 'Base — jobber i hele Norge' },
    { value: 'Null', label: 'Mellomledd mellom deg og koden' },
  ],
  /**
   * Vises som en liten rund avatar ved navnet, ikke som stort portrett.
   * Dette er en tegnet figur, ikke et foto — stort format ville fått
   * seksjonen til å lese som en spillprofil. Bytt gjerne mot et ekte
   * bilde av deg; da tåler den å bli større. Tom streng skjuler den.
   */
  portrait: '/images/michael.webp',
  portraitAlt: 'Michael, utvikleren bak Firix',
}

export const work = {
  eyebrow: 'Arbeid',
  title: 'Levert og live.',
  lead: 'Ikke skjermbilder — de faktiske nettstedene, hentet inn direkte fra nettet. Klikk deg inn og se selv.',
  emptyState: 'Prosjektene legges ut fortløpende. Ta kontakt for referanser i mellomtiden.',
  seeAll: 'Se alle prosjekter',
}

export const priceSection = {
  eyebrow: 'Priser',
  title: 'Byråkvalitet.\nUten byråets regning.',
  lead: 'Et byrå må dekke kontorlokaler, selgere, prosjektledere og eiere. Jeg må dekke min egen tid. Det er hele forskjellen — og den havner i din favør.',
  comparisonTitle: 'Hva du ikke betaler for',
  comparisonItems: [
    'Prosjektleder som videreformidler beskjeder',
    'Selger med provisjon på toppen',
    'Kontorlokaler i sentrum',
    'Timepris som løper mens noen leter etter riktig person',
  ],
  disclaimer:
    'Prisene er utgangspunkt for typiske leveranser. Endelig fastpris settes etter en gjennomgang av hva du faktisk trenger — du får den skriftlig før vi starter.',
}

export const process = {
  eyebrow: 'Prosess',
  title: 'Slik foregår det.',
  lead: 'Fire steg. Ingen overraskelser underveis.',
  steps: [
    {
      n: '01',
      title: 'Samtale',
      body: 'Vi bruker 30 minutter på hva du trenger og hvorfor. Gratis og uforpliktende. Er jeg feil person for jobben, sier jeg det.',
    },
    {
      n: '02',
      title: 'Fastpris',
      body: 'Du får et skriftlig tilbud med omfang, tidsplan og endelig pris. Det tallet endrer seg ikke med mindre du selv ber om mer.',
    },
    {
      n: '03',
      title: 'Bygging',
      body: 'Du får en lenke til siden fra dag én og ser fremgangen fortløpende. Innspill underveis, ikke en stor avsløring på slutten.',
    },
    {
      n: '04',
      title: 'Lansering og drift',
      body: 'Jeg setter opp domene, publisering og analyse. Deretter er jeg tilgjengelig for videre arbeid — uten bindingstid.',
    },
  ],
}

export const faq = {
  eyebrow: 'Spørsmål',
  title: 'Det bedrifter lurer på.',
  items: [
    {
      q: 'Hvorfor er du billigere enn et byrå?',
      a: 'Fordi jeg ikke har byråets kostnader. Ingen kontorlokaler, ingen selgere med provisjon, ingen prosjektleder som skal betales for å videreformidle beskjeder. Timene du betaler for går til utvikling. Kvaliteten på koden er den samme — kostnadsstrukturen er det ikke.',
    },
    {
      q: 'Hva skjer hvis du blir utilgjengelig?',
      a: 'Du eier koden og alle kontoer fra dag én. Alt ligger i et kodelager du har tilgang til, bygget på standard teknologi (React, TypeScript) som enhver utvikler kan overta. Du blir aldri låst til meg.',
    },
    {
      q: 'Kan jeg oppdatere innholdet selv?',
      a: 'Ja. På Bedriftsnettside og Webapplikasjon får du et redigeringsgrensesnitt for tekst, bilder og sider. Du trenger ikke ringe meg for å bytte et telefonnummer.',
    },
    {
      q: 'Hva koster det å drifte siden etterpå?',
      a: 'Selve driften koster typisk under 200 kr i måneden til domene og hosting — det betaler du direkte til leverandøren, ikke til meg. Ønsker du at jeg håndterer oppdateringer og support, avtaler vi det separat uten bindingstid.',
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
  lead: '30 minutter, gratis og uforpliktende. Du får et ærlig svar på hva det vil koste og hvor lang tid det tar — også hvis svaret er at du ikke trenger meg.',
  cta: { label: 'Send en henvendelse', to: '/kontakt' },
}

export const contactPage = {
  eyebrow: 'Kontakt',
  title: 'Fortell meg hva du trenger.',
  lead: `Beskriv prosjektet med dine egne ord. Jeg svarer ${business.responseTime} med konkrete spørsmål eller et prisestimat.`,
  form: {
    name: 'Navn',
    company: 'Bedrift',
    email: 'E-post',
    phone: 'Telefon (valgfritt)',
    budget: 'Omtrentlig budsjett',
    budgetOptions: [
      'Ikke avklart ennå',
      'Under 25 000',
      '25 000 – 50 000',
      '50 000 – 100 000',
      'Over 100 000',
    ],
    message: 'Hva vil du bygge?',
    messagePlaceholder:
      'For eksempel: «Vi er et rørleggerfirma med 6 ansatte og trenger en ny nettside. Den vi har nå er fra 2014 og fungerer dårlig på mobil.»',
    submit: 'Send henvendelse',
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
