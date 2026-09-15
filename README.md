# firix.no

Nettsiden til Firix — nettsider og webapplikasjoner for norske bedrifter.
Bygget med Vite, React 19, TypeScript, Tailwind CSS og Framer Motion.

---

## 🚚 Hosting: midlertidig på GitHub Pages, på vei til Vercel

`firix.no` peker i dag på GitHub Pages (`185.199.108–111.153`). Pages kan
ikke kjøre kode, så `/api`-rutene finnes ikke der. Nettsiden er bygget for å
tåle begge deler:

| | GitHub Pages (nå) | Vercel (målet) |
|---|---|---|
| Nettsiden og prosjektvisning | ✅ | ✅ |
| Live forhåndsvisninger | ✅ | ✅ |
| Dype lenker (`/prosjekter/…`) | ✅ via `404.html` (svarer HTTP 404) | ✅ ekte rewrite |
| Kontaktskjema | ✅ faller tilbake til Web3Forms | ✅ egen kode via Resend |
| `/admin` — velge prosjekter | ❌ forklarer hvorfor | ✅ lagrer for alle besøkende |

Kontaktskjemaet velger selv: det prøver `/api/contact` først, og bruker
Web3Forms bare hvis ruten ikke finnes. Ingen kodeendring trengs ved flytting.

### Slik fullfører du flyttingen til Vercel

1. Opprett konto på vercel.com og importer `KevinRyans/firix-portfolio`.
   Build-kommando og output (`dist`) oppdages automatisk.
2. Legg inn miljøvariablene under (`ADMIN_PASSWORD`, `RESEND_API_KEY`) og
   koble på en KV-database (Storage → Create → KV).
3. Legg til `firix.no` under Settings → Domains. Vercel viser hvilke
   DNS-verdier du skal bruke — typisk:
   - `firix.no` → A-record `76.76.21.21`
   - `www.firix.no` → CNAME `cname.vercel-dns.com`

   Fjern de fire GitHub Pages-A-recordene (`185.199.108–111.153`).
4. Når firix.no svarer fra Vercel: slett `.github/workflows/deploy.yml` og
   `public/CNAME` fra repoet. Da er Pages-oppsettet borte og `/admin`
   fungerer.

> Rekkefølgen er med vilje: Pages-deployen står til Vercel er verifisert, så
> nettsiden aldri er nede i mellomtiden.

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

## Forhåndsvisninger av prosjektene

Hvert prosjekt vises i en nettleserramme. Du velger måte i `/admin`:

### Automatisk skjermbilde (standard)

Skjermbildene tas av **GitHub Actions** og legges i repoet, så nettsiden
serverer dem fra ditt eget domene. Ingen ekstern tjeneste involveres når en
besøkende er inne på siden.

`.github/workflows/previews.yml` kjører hver mandag, og når du selv trykker
**Run workflow**. Den starter Chromium, åpner hvert prosjektnettsted i 1200 ×
750 på 2x, slår av animasjoner, og lagrer `public/previews/<slug>.jpg`.
Endres noe, committes bildene — og den commiten utløser en ny publisering.

Prosjektlisten hentes fra `https://firix.no/api/projects` når det finnes, slik
at prosjekter du legger til i `/admin` kommer med uten at noen rører koden.
Ellers leses listen i `src/content/projects.ts`. Prosjekter som allerede har
et eget bilde hoppes over, og et nettsted som er nede sletter ikke bildet som
ligger der fra før.

Kjør den lokalt slik:

```bash
npx playwright install chromium
node scripts/capture-previews.mjs                    # fra src/content/projects.ts
node scripts/capture-previews.mjs --api=https://firix.no   # fra den publiserte listen
```

**Reserver, i rekkefølge.** Finnes ikke `public/previews/<slug>.jpg` ennå,
prøver siden `/api/screenshot` (som henter bildet på serveren og lar Vercel
cache det), så en gratis skjermbildetjeneste direkte fra nettleseren, og til
slutt et formgitt kort med navn og domene. Kortet er aldri tomt.

Merk at en slik tjeneste bygger bildet asynkront og svarer med en liten grå
stump første gang den ser en URL. Den stumpen er et gyldig bilde, så den
laster uten feil — siden avviser den derfor på bredde, og viser kortet i
stedet. Det er nettopp denne usikkerheten skjermbildene i repoet fjerner.

### Eget bilde

Best kvalitet. Lagre i `public/previews/` (1440 × 900, JPG eller WebP, under
300 kB) og skriv stien — for eksempel `/previews/privatsamleren.jpg` — i
feltet **«Bilde-sti»**. Et eget bilde vinner alltid over det automatiske.

### Live nettsted

Nettstedet lastes i en iframe, skalert ned fra 1440px, montert først når
kortet nærmer seg skjermen og ikke klikkbart før brukeren trykker «Utforsk i
kortet».

**Dette må velges bevisst per prosjekt.** Mange nettsteder nekter innramming
via `X-Frame-Options` eller `CSP: frame-ancestors`, og det kan ikke oppdages
fra nettleseren. Målt på en blokkert og en tillatt ramme side om side:

| | Blokkert | Tillatt |
|---|---|---|
| `onload` fyrer | ja | ja |
| `contentDocument` | `null` | `null` |
| `contentWindow.origin` | SecurityError | SecurityError |
| `contentWindow.location` | SecurityError | SecurityError |

Signalene er identiske, så en blokkert ramme kan ikke byttes automatisk mot
et bilde — den tegner nettleserens grå feilside oppå alt annet.

Merk at slike hoder ofte er knyttet til opphav: et nettsted kan tillate
`https://firix.no` og samtidig blokkere `localhost`. Test derfor fra det
domenet siden faktisk skal kjøre på.

Er du på Vercel: trykk **«Kan nettstedet vises live?»** i `/admin`. Serveren
leser hodene og slår av live-modus hvis nettstedet blokkerer. Ellers:

```bash
curl -sI https://example.com | grep -i -E 'x-frame-options|content-security-policy'
```

## Miljøvariabler

Settes i Vercel under **Settings → Environment Variables**. Se `.env.example`.

| Variabel | Kreves for | Merknad |
|---|---|---|
| `ADMIN_PASSWORD` | Innlogging på `/admin` | **Aldri** med `VITE_`-prefiks |
| `ADMIN_SESSION_SECRET` | Valgfri | Signerer sesjonstokenet. Faller tilbake til `ADMIN_PASSWORD` |
| `RESEND_API_KEY` | Kontaktskjemaet | Domenet må være verifisert hos Resend |
| `KV_REST_API_URL` | Prosjektlisten + statistikk | **Ikke legg inn manuelt** — se under |
| `KV_REST_API_TOKEN` | Prosjektlisten + statistikk | **Ikke legg inn manuelt** — se under |

### Databasen

Vercel har lagt ned «Vercel KV» som eget produkt. Opprett den under
**Storage → Marketplace → Upstash → Redis** — samme tjeneste som KV alltid
var. Koden snakker REST over HTTP, så en leverandør som bare gir en
`redis://`-streng (som «Redis — Official Redis for Vercel») fungerer ikke.

**De to `KV_*`-variablene skal du ikke legge inn selv.** Integrasjonen lager
dem når du kobler databasen til prosjektet. Har du allerede lagt dem inn for
hånd, stopper installasjonen med:

> This project already has an existing environment variable with name
> KV_REST_API_URL in one of the chosen environments

Slett dem da under **Settings → Environment Variables**, og kjør
integrasjonen på nytt med tomt prefiks-felt.

Bruker du et eget prefiks, eller kobler du til på en måte som gir Upstash
sine egne navn (`UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`), leser
koden begge deler — se `api/_kv.ts`.

Husk å **redeploye** etterpå. Miljøvariabler tas ikke i bruk før neste
deploy.

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

**Nå:** push til `main` → `.github/workflows/deploy.yml` bygger og publiserer
til GitHub Pages. `CI` kjører lint og et typesjekket bygg på alle brancher.

**Etter flytting:** Vercel bygger og publiserer automatisk ved push til
`main`. `vercel.json` ruter alle ikke-`/api`-forespørsler til `index.html`,
så dype lenker svarer med HTTP 200 i stedet for 404.
