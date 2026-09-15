/**
 * Tar skjermbilder av prosjektnettstedene og lagrer dem i public/previews/.
 *
 * Kjøres av .github/workflows/previews.yml. Bildene committes til repoet og
 * serveres fra vårt eget domene, så nettsiden er ikke avhengig av en
 * skjermbildetjeneste når en besøkende er der.
 *
 * Prosjektlisten hentes fra det publiserte API-et når det finnes, slik at
 * prosjekter du legger til i /admin kommer med uten at noen rører koden.
 * Ellers leses reservelisten i src/content/projects.ts.
 */
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'previews')

const WIDTH = 1200
const HEIGHT = 750
/** 2x gir skarpe bilder på moderne skjermer uten at filene blir enorme. */
const SCALE = 2
const NAV_TIMEOUT_MS = 45000
/** Ekstra ro etter innlasting, så innfasinger rekker å bli ferdige. */
const SETTLE_MS = 2500

const args = new Map(
  process.argv.slice(2).map((arg) => {
    const [key, ...rest] = arg.replace(/^--/, '').split('=')
    return [key, rest.join('=') || 'true']
  }),
)

/** Leser prosjektlisten fra det publiserte API-et. */
async function fromApi(base) {
  if (!base) return null
  try {
    const res = await fetch(new URL('/api/projects', base), { signal: AbortSignal.timeout(15000) })
    if (!res.ok) return null
    const data = await res.json()
    return Array.isArray(data.projects) && data.projects.length > 0 ? data.projects : null
  } catch {
    return null
  }
}

/** Leser reservelisten. Filen er TypeScript, så den må oversettes først. */
function fromSource() {
  const tmp = join(root, 'node_modules', '.tmp-projects.mjs')
  mkdirSync(dirname(tmp), { recursive: true })
  execFileSync(
    'npx',
    ['esbuild', join(root, 'src/content/projects.ts'), '--bundle', '--format=esm', `--outfile=${tmp}`, '--log-level=error'],
    { cwd: root, stdio: 'inherit' },
  )
  return tmp
}

async function loadProjects() {
  const fromRemote = await fromApi(args.get('api'))
  if (fromRemote) {
    console.log(`Hentet ${fromRemote.length} prosjekter fra API-et.`)
    return fromRemote
  }
  const tmp = fromSource()
  try {
    const mod = await import(`file://${tmp}?t=${Date.now()}`)
    console.log(`Leste ${mod.defaultProjects.length} prosjekter fra src/content/projects.ts.`)
    return mod.defaultProjects
  } finally {
    rmSync(tmp, { force: true })
  }
}

async function capture(browser, project) {
  const target = project.previewUrl || project.url
  const file = join(outDir, `${project.slug}.jpg`)

  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: SCALE,
    locale: 'nb-NO',
  })
  const page = await context.newPage()

  try {
    const response = await page.goto(target, {
      waitUntil: 'networkidle',
      timeout: NAV_TIMEOUT_MS,
    })
    if (response && response.status() >= 400) {
      throw new Error(`svarte ${response.status()}`)
    }

    // Slå av animasjoner, ellers fanges de midt i bevegelsen.
    await page.addStyleTag({
      content: `*,*::before,*::after{animation:none!important;transition:none!important}`,
    })
    await page.waitForTimeout(SETTLE_MS)

    const buffer = await page.screenshot({ type: 'jpeg', quality: 82 })
    writeFileSync(file, buffer)
    console.log(`✓ ${project.slug}  ${target}  ${(buffer.byteLength / 1024).toFixed(0)} kB`)
    return true
  } catch (error) {
    // Et nettsted som er nede skal ikke slette et bilde som allerede finnes.
    console.log(`✗ ${project.slug}  ${target}  ${error.message}`)
    return false
  } finally {
    await context.close()
  }
}

const projects = (await loadProjects()).filter((project) => {
  const target = project.previewUrl || project.url
  if (!target || !/^https?:\/\//.test(target)) return false
  // Har du lagt inn ditt eget bilde, skal det ikke overskrives.
  return !project.posterImage
})

if (projects.length === 0) {
  console.log('Ingen prosjekter å fange.')
  process.exit(0)
}

mkdirSync(outDir, { recursive: true })
const browser = await chromium.launch()

let ok = 0
for (const project of projects) {
  if (await capture(browser, project)) ok++
}
await browser.close()

console.log(`\n${ok} av ${projects.length} skjermbilder oppdatert.`)
// Enkeltnettsteder som er nede skal ikke feile hele kjøringen.
process.exit(ok === 0 && projects.length > 0 ? 1 : 0)
