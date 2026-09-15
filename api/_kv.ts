/**
 * Tilkoblingsdetaljer til nøkkel/verdi-lageret.
 *
 * Vercel har lagt ned «Vercel KV» som eget produkt. Databasen opprettes nå
 * gjennom Marketplace → Upstash → Redis, som er nøyaktig samme tjeneste.
 * Avhengig av hvordan den kobles på, settes variablene enten med Vercels
 * gamle `KV_REST_API_*`-navn eller Upstash sine egne `UPSTASH_REDIS_REST_*`.
 *
 * Vi leser begge, så oppsettet virker uansett hvilken vei du gikk.
 *
 * Merk at begge er REST-endepunkter over HTTP. En vanlig Redis-leverandør
 * som gir en `redis://`-streng vil ikke fungere her.
 */
export const KV_URL = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? ''

export const KV_TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? ''

export const kvConfigured = Boolean(KV_URL && KV_TOKEN)
