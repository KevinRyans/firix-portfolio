# firix.no

Nettsiden til Firix — nettsider og webapplikasjoner for norske bedrifter.
Bygget med Vite, React 19, TypeScript, Tailwind CSS og Framer Motion, og
deployet på Vercel.

---

## ⚠️ Før siden kan brukes: fyll inn dine egne tall

Nettsiden inneholder ingen oppdiktede priser, org.nr eller kunderesultater.
Feltene ligger som tomme placeholdere i **`src/content/site.ts`** og skjuler
seg selv på siden inntil de fylles ut.

| Hva | Hvor | Hva skjer hvis den står tom |
|---|---|---|
| Organisasjonsnummer | `business.orgNumber` | Skjules i footeren |
| Telefonnummer | `business.phone` | Skjules i footer og på kontaktsiden |
| Fastpriser | `pricing.packages[].from` | Viser «Pris på forespørsel» |
| Byråpris til sammenligning | `pricing.packages[].agencyFrom` | Sammenligningen skjules |
| Timepris | `pricing.hourlyRate` | Setningen om timepris skjules |

Oppgi bare tall du kan forsvare hvis en kunde spør hvor de kommer fra.

---

## Velge hvilke prosjekter som vises

Gå til **`/admin`**, logg inn med `ADMIN_PASSWORD`, og du får en liste over
alle prosjektene:

- **Bryteren til høyre** slår prosjektet av og på på nettsiden.
- **Pilene til venstre** bestemmer rekkefølgen.
- **«Fremhev»** gir prosjektet stor forhåndsvisning øverst i Arbeid-seksjonen.
- **«Lagre»** skriver til Vercel KV, og endringen er umiddelbart live for alle
  besøkende.

Listen lagres på serveren, ikke i nettleseren din. Det er hele poenget:
den forrige versjonen av dette panelet lagret i `localStorage`, som betyr at
valgene aldri nådde en eneste besøkende.

Er KV ikke koblet til ennå, faller siden tilbake til listen i
`src/content/projects.ts` slik at forsiden aldri står tom.

---

## Live forhåndsvisninger

Prosjektkortene laster det ekte nettstedet i en nedskalert iframe. Iframen
monteres først når kortet nærmer seg skjermen, og er ikke klikkbar før
brukeren trykker «Utforsk i kortet», slik at den ikke spiser scrollingen.

**Noen nettsteder nekter å bli vist i ramme** (`X-Frame-Options` eller
`Content-Security-Policy: frame-ancestors`). Sjekk et nettsted slik:

```bash
curl -sI https://example.com | grep -i -E 'x-frame-options|content-security-policy'
```

- Ingen treff → live forhåndsvisning fungerer.
- `DENY` eller `SAMEORIGIN` → bytt prosjektet til **«Bilde»** i `/admin` og
  legg et skjermbilde i `public/previews/`.

Kortet faller uansett tilbake til bildet (eller en nøytral plate) hvis
innlastingen feiler eller tar mer enn ni sekunder — en besøkende ser aldri en
ødelagt ramme.

---

## Miljøvariabler

Settes i Vercel under **Settings → Environment Variables**. Se `.env.example`.

| Variabel | Kreves for | Merknad |
|---|---|---|
| `ADMIN_PASSWORD` | Innlogging på `/admin` | **Aldri** med `VITE_`-prefiks |
| `ADMIN_SESSION_SECRET` | Valgfri | Signerer sesjonstokenet. Faller tilbake til `ADMIN_PASSWORD` |
| `RESEND_API_KEY` | Kontaktskjemaet | Domenet må være verifisert hos Resend |
| `KV_REST_API_URL` | Prosjektlisten + statistikk | Settes automatisk når KV kobles til |
| `KV_REST_API_TOKEN` | Prosjektlisten + statistikk | Settes automatisk når KV kobles til |

> **Alt som starter med `VITE_` kompileres inn i den offentlige
> JavaScript-bundlen og kan leses av hvem som helst i nettleserens
> utviklerverktøy.** Hemmeligheter skal derfor aldri ha det prefikset.

---

## Utvikling

```bash
npm install
npm run dev        # utviklingsserver
npm run lint       # eslint
npm run typecheck  # tsc over src, vite.config og api/
npm run build      # typesjekk + produksjonsbygg
```

`/api`-rutene kjører ikke under `npm run dev`. Bruk `vercel dev` for å teste
kontaktskjemaet og admin-panelet mot ekte endepunkter.

---

## Struktur

```
api/                    Vercel-funksjoner
  _auth.ts              Signering og verifisering av admin-token
  admin-login.ts        Passord → kortlevd token
  projects.ts           GET (offentlig) / PUT (admin) mot KV
  contact.ts            Kontaktskjema via Resend
  track.ts              Besøksregistrering
  analytics.ts          Leser statistikk (krever admin-token)
src/
  content/site.ts       All tekst, priser og bedriftsinfo
  content/projects.ts   Prosjektmodell + fallback-liste
  components/projects/  LivePreview og prosjektkort
  components/sections/  Seksjonene på forsiden
  pages/Admin.tsx       Prosjektstyring
```

## Deploy

Push til `main`. Vercel bygger og publiserer automatisk.
`vercel.json` ruter alle ikke-`/api`-forespørsler til `index.html`, slik at
adresser som `/prosjekter/privatsamleren` fungerer ved direkte innlasting.
