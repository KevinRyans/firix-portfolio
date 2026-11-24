import { useEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { hero, type Layer } from '../../content/site'

/**
 * Tre plater i 3D: nettsiden øverst, appen i midten, serveren nederst.
 *
 * Dette er det ene store grepet på siden. Det forklarer det som skiller
 * Firix fra et vanlig webbyrå — jeg bygger ikke bare det øverste laget, men
 * hele stabelen — uten at noen trenger å lese en setning.
 *
 * Bevegelsen:
 *  1. Ved innlasting faller platene på plass nedenfra og opp.
 *  2. Når du scroller forbi hero, glir de fra hverandre så du ser hvert lag.
 *  3. På desktop vipper stabelen litt etter musepekeren.
 *
 * Alt er `transform`, så nettleseren gjør jobben på GPU-en. Ingen WebGL,
 * ingen ekstra bibliotek. Med «reduser bevegelse» står stabelen stille,
 * delvis åpnet, så lagene fortsatt er lesbare.
 */

type Props = {
  /** Scroll-fremdrift gjennom hero, 0–1. */
  progress: MotionValue<number>
}

const ORDER: Layer[] = ['server', 'app', 'site']

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

export default function LayerStack({ progress }: Props) {
  const reduce = useReducedMotion()
  const sceneRef = useRef<HTMLDivElement>(null)

  // 0 → 1 når platene har landet.
  const assemble = useMotionValue(reduce ? 1 : 0)

  useEffect(() => {
    if (reduce) {
      assemble.set(1)
      return
    }
    const controls = animate(assemble, 1, { duration: 1.6, ease: 'linear', delay: 0.15 })
    return () => controls.stop()
  }, [assemble, reduce])

  // Pekervipping. Fjæren gjør at stabelen henger litt etter, som en gjenstand.
  const tiltX = useSpring(0, { stiffness: 60, damping: 18 })
  const tiltY = useSpring(0, { stiffness: 60, damping: 18 })

  useEffect(() => {
    if (reduce) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    const onMove = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth - 0.5
      const y = event.clientY / window.innerHeight - 0.5
      tiltX.set(y * -7)
      tiltY.set(x * 10)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce, tiltX, tiltY])

  // Under xl står etikettene rett under stabelen, så den åpner seg mindre
  // der for ikke å legge seg over dem.
  const [wide, setWide] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1280px)')
    const update = () => setWide(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  // Hvor langt fra hverandre platene står. Hviler litt åpent, åpner seg mer
  // mens du scroller.
  const range = wide ? 0.95 : 0.4
  const spread = useTransform(progress, (p) => (reduce ? 0.85 : 0.5 + clamp01(p / 0.75) * range))

  const rotX = useTransform([tiltX, progress], ([t, p]) => 57 + (t as number) - (p as number) * 6)
  const rotZ = useTransform([tiltY, progress], ([t, p]) => -40 + (t as number) + (p as number) * 10)
  const rigTransform = useMotionTemplate`rotateX(${rotX}deg) rotateZ(${rotZ}deg)`

  return (
    <div
      ref={sceneRef}
      className="stack-scene relative h-[min(92vw,380px)] w-full select-none sm:h-[460px] lg:h-[560px]"
      aria-hidden="true"
    >
      <motion.div className="stack-rig" style={{ transform: rigTransform }}>
        {ORDER.map((layer, index) => (
          <Slab key={layer} layer={layer} index={index} spread={spread} assemble={assemble} />
        ))}
      </motion.div>
      {ORDER.map((layer, index) => (
        <LayerLabel
          key={layer}
          layer={layer}
          index={index}
          spread={spread}
          assemble={assemble}
          rotX={rotX}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */

/** Platens høyde på Z-aksen: hvor den hviler, pluss fallet ved innlasting. */
function useSlabZ(index: number, spread: MotionValue<number>, assemble: MotionValue<number>) {
  // Nederste plate lander først.
  const start = index * 0.22
  return useTransform([spread, assemble], ([s, a]) => {
    const local = easeOut(clamp01(((a as number) - start) / 0.56))
    const resting = (index - 1) * (22 + (s as number) * 118)
    return resting + (1 - local) * 340
  })
}

const LAYER_STYLE: Record<Layer, { face: string; front: string; side: string }> = {
  site: { face: '#F7F9F5', front: '#C9D2CC', side: '#B4C0B9' },
  app: { face: '#0F4542', front: '#0A302E', side: '#082624' },
  server: { face: '#10201C', front: '#0A1512', side: '#070F0D' },
}

function Slab({
  layer,
  index,
  spread,
  assemble,
}: {
  layer: Layer
  index: number
  spread: MotionValue<number>
  assemble: MotionValue<number>
}) {
  const start = index * 0.22
  const z = useSlabZ(index, spread, assemble)
  const opacity = useTransform(assemble, (a) => clamp01((a - start) / 0.18))
  const transform = useMotionTemplate`translateZ(${z}px)`
  const colors = LAYER_STYLE[layer]

  return (
    <motion.div className="slab" style={{ transform, opacity }}>
      <div className="slab-edge-front" style={{ background: colors.front }} />
      <div className="slab-edge-side" style={{ background: colors.side }} />
      <div
        className="slab-face"
        style={{
          background: colors.face,
          boxShadow:
            layer === 'site'
              ? 'inset 0 0 0 1px rgba(16,32,28,0.08)'
              : 'inset 0 0 0 1px rgba(238,243,239,0.06)',
        }}
      >
        {layer === 'site' ? <SiteFace /> : layer === 'app' ? <AppFace /> : <ServerFace />}
      </div>
    </motion.div>
  )
}

/**
 * Etikett for ett lag, flatt i 2D så den alltid er lesbar. Høyden på skjermen
 * følger platens Z-posisjon projisert gjennom stabelens vinkel.
 */
function LayerLabel({
  layer,
  index,
  spread,
  assemble,
  rotX,
}: {
  layer: Layer
  index: number
  spread: MotionValue<number>
  assemble: MotionValue<number>
  rotX: MotionValue<number>
}) {
  const z = useSlabZ(index, spread, assemble)
  const y = useTransform(
    [z, rotX],
    ([zz, rx]) => -(zz as number) * Math.sin(((rx as number) * Math.PI) / 180),
  )
  const opacity = useTransform(assemble, (a) => clamp01((a - 0.8) / 0.2))
  const info = hero.layers.find((item) => item.id === layer)!

  return (
    <motion.div className="slab-label hidden xl:block" style={{ y, opacity }}>
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-blekk/35" />
        <div>
          <p className="text-[17px] font-semibold leading-tight tracking-[-0.02em] text-blekk">
            {info.label}
          </p>
          <p className="text-[13px] leading-tight text-[#53625d]">{info.note}</p>
        </div>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ *
 * Flatene. Enkle former, ingen tekst — det er motiver, ikke skjermbilder.
 * ------------------------------------------------------------------ */

function SiteFace() {
  return (
    <div className="flex h-full flex-col p-[7%]">
      <div className="flex items-center justify-between">
        <div className="h-[7px] w-[22%] rounded-full bg-blekk" />
        <div className="flex gap-[6%]" style={{ width: '34%' }}>
          <div className="h-[5px] flex-1 rounded-full bg-blekk/25" />
          <div className="h-[5px] flex-1 rounded-full bg-blekk/25" />
          <div className="h-[5px] flex-1 rounded-full bg-blekk/25" />
        </div>
      </div>
      <div className="mt-[12%] h-[13px] w-[78%] rounded-sm bg-blekk" />
      <div className="mt-[3.5%] h-[13px] w-[56%] rounded-sm bg-blekk" />
      <div className="mt-[6%] h-[5px] w-[64%] rounded-full bg-blekk/25" />
      <div className="mt-[2.5%] h-[5px] w-[48%] rounded-full bg-blekk/25" />
      <div className="mt-[8%] h-[16px] w-[30%] rounded-[4px] bg-signal" />
      <div className="mt-auto grid grid-cols-3 gap-[4%]">
        <div className="aspect-[4/3] rounded-[4px] bg-fjord/85" />
        <div className="aspect-[4/3] rounded-[4px] bg-fjord/55" />
        <div className="aspect-[4/3] rounded-[4px] bg-fjord/30" />
      </div>
    </div>
  )
}

function AppFace() {
  return (
    <div className="flex h-full">
      <div className="flex w-[24%] flex-col gap-[9%] border-r border-white/10 p-[6%] pt-[9%]">
        <div className="h-[6px] w-[70%] rounded-full bg-signal" />
        <div className="h-[5px] w-[85%] rounded-full bg-white/30" />
        <div className="h-[5px] w-[60%] rounded-full bg-white/30" />
        <div className="h-[5px] w-[75%] rounded-full bg-white/30" />
      </div>
      <div className="flex flex-1 flex-col p-[6%]">
        <div className="flex items-center justify-between">
          <div className="h-[9px] w-[40%] rounded-sm bg-white/85" />
          <div className="h-[14px] w-[22%] rounded-[4px] bg-white/15" />
        </div>
        <div className="mt-[8%] flex-1 space-y-[5%]">
          {[0.9, 0.7, 0.8, 0.6, 0.75].map((w, i) => (
            <div key={i} className="flex items-center gap-[5%] border-b border-white/10 pb-[4%]">
              <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-white/40" />
              <div className="h-[5px] rounded-full bg-white/45" style={{ width: `${w * 60}%` }} />
              <div
                className={`ml-auto h-[7px] w-[16%] rounded-full ${i === 1 ? 'bg-signal' : 'bg-white/20'}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ServerFace() {
  return (
    <div className="flex h-full flex-col justify-center gap-[6%] p-[8%]">
      {[0, 1, 2, 3].map((row) => (
        <div
          key={row}
          className="flex h-[17%] items-center gap-[4%] rounded-[5px] border border-white/10 bg-white/[0.04] px-[5%]"
        >
          <span
            className="h-[7px] w-[7px] rounded-full bg-[#3ddc84] animate-blink motion-reduce:animate-none"
            style={{ animationDelay: `${row * 0.7}s` }}
          />
          <span
            className={`h-[7px] w-[7px] rounded-full ${row === 2 ? 'bg-signal' : 'bg-white/25'}`}
          />
          <div className="ml-[4%] flex flex-1 gap-[3%]">
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} className="h-[55%] min-h-[6px] flex-1 rounded-[2px] bg-white/10" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
