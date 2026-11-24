import { motion, useReducedMotion, useTransform, type MotionValue } from 'framer-motion'
import { layers, type Layer } from '../../content/site'

/**
 * Eksplodert aksonometri av de tre lagene: nettside, applikasjon og server.
 *
 * Tegningen er det bærende grepet på forsiden. Den viser hele leveransen som
 * én konstruksjon — det som skiller Firix fra noen som bare lager det øverste
 * laget — og den er tegnet slik en arkitekt tegner, med konstruksjonslinjer,
 * henvisningslinjer og målsetting.
 *
 * Bevegelse:
 *  1. Ved innlasting tegnes strekene opp, nedenfra og opp.
 *  2. Når du scroller, skilles lagene, og målet mellom dem teller med.
 *
 * Alt er SVG og `transform`. Med «reduser bevegelse» står tegningen ferdig
 * og stille.
 */

// Isometrisk projeksjon: 30° på begge akser.
const COS = Math.cos(Math.PI / 6)
const SIN = Math.sin(Math.PI / 6)
const OX = 300
const OY = 200
const W = 250
const D = 190
const T = 14

type Pt = [number, number]
const P = (x: number, y: number, z: number): Pt => [OX + (x - y) * COS, OY + (x + y) * SIN - z]
const pts = (...list: Pt[]) => list.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(' ')
const quad = (x0: number, y0: number, x1: number, y1: number, z: number) =>
  pts(P(x0, y0, z), P(x1, y0, z), P(x1, y1, z), P(x0, y1, z))

/** Rekkefølgen platene tegnes i: bakerst (nederst) først. */
const ORDER: Layer[] = ['server', 'app', 'site']

type Props = {
  /** Avstanden mellom lagene, i tegningens enheter. */
  gap: MotionValue<number>
  /** Uten henvisningslinjer: tegningen beskjæres til platene. */
  compact?: boolean
}

export default function Axonometric({ gap, compact = false }: Props) {
  const reduce = !!useReducedMotion()

  // Konstruksjonslinjene går fra øverste til nederste plate i hvert hjørne.
  const corners: [number, number][] = [
    [0, 0],
    [W, 0],
    [0, D],
    [W, D],
  ]

  // Målsettingen til venstre: avstanden mellom server og applikasjon.
  const dimX = P(0, D, 0)[0] - 34
  const dimBase = P(0, D, T)[1]
  const dimY1 = useTransform(gap, (g) => dimBase + g)
  const dimY2 = dimBase
  const dimMid = useTransform(gap, (g) => dimBase + g / 2 + 4)
  const dimLabel = useTransform(gap, (g) => `${Math.round(g)}`)

  return (
    <svg
      viewBox={compact ? '70 24 470 568' : '64 24 716 568'}
      className="h-auto w-full overflow-visible text-accent"
      role="img"
      aria-labelledby="axo-title"
    >
      <title id="axo-title">Eksplodert tegning av tre lag: nettside, applikasjon og server.</title>
      <defs>
        <marker
          id="axo-arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 2 L5 5 L0 8" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </marker>
      </defs>

      {/* Skjulte konstruksjonslinjer, bak platene. */}
      {corners.map(([x, y]) => (
        <ConstructionLine key={`${x}-${y}`} x={x} y={y} gap={gap} reduce={reduce} />
      ))}

      {ORDER.map((layer, index) => (
        <Slab key={layer} layer={layer} index={index} gap={gap} reduce={reduce} />
      ))}

      {/* Målsetting. */}
      <motion.g
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.6 }}
      >
        <motion.line
          x1={dimX}
          x2={dimX}
          y1={dimY1}
          y2={dimY2}
          stroke="currentColor"
          strokeWidth="1"
          markerStart="url(#axo-arrow)"
          markerEnd="url(#axo-arrow)"
        />
        <motion.line
          x1={dimX - 6}
          x2={P(0, D, 0)[0] - 6}
          y1={dimY1}
          y2={dimY1}
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="3 4"
          opacity="0.6"
        />
        <line
          x1={dimX - 6}
          x2={P(0, D, 0)[0] - 6}
          y1={dimY2}
          y2={dimY2}
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="3 4"
          opacity="0.6"
        />
        <motion.text
          x={dimX - 10}
          y={dimMid}
          textAnchor="end"
          className="fill-current text-[13px] font-medium tabular-nums"
        >
          {dimLabel}
        </motion.text>
      </motion.g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */

/** Vertikal forskyvning for et lag: midterste står stille. */
function useOffset(index: number, gap: MotionValue<number>) {
  return useTransform(gap, (g) => (1 - index) * g)
}

function ConstructionLine({
  x,
  y,
  gap,
  reduce,
}: {
  x: number
  y: number
  gap: MotionValue<number>
  reduce: boolean
}) {
  const [sx, sy0] = P(x, y, 0)
  const y1 = useTransform(gap, (g) => sy0 - T - g)
  const y2 = useTransform(gap, (g) => sy0 + g)
  return (
    <motion.line
      x1={sx}
      x2={sx}
      y1={y1}
      y2={y2}
      stroke="currentColor"
      strokeWidth="0.8"
      strokeDasharray="3 4"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ delay: 1.4, duration: 0.8 }}
    />
  )
}

const FILLS = { top: 'var(--elevated)', left: '#E4E8FD', right: '#D3D9FA' }

function Slab({
  layer,
  index,
  gap,
  reduce,
}: {
  layer: Layer
  index: number
  gap: MotionValue<number>
  reduce: boolean
}) {
  const y = useOffset(index, gap)
  const fills = FILLS
  const info = layers.find((item) => item.id === layer)!

  const top = pts(P(0, 0, T), P(W, 0, T), P(W, D, T), P(0, D, T))
  const left = pts(P(0, D, T), P(W, D, T), P(W, D, 0), P(0, D, 0))
  const right = pts(P(W, 0, T), P(W, D, T), P(W, D, 0), P(W, 0, 0))

  // Nederste plate tegnes først.
  const delay = 0.15 + index * 0.32
  const draw = (extra = 0) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, fillOpacity: 0 },
          animate: { pathLength: 1, fillOpacity: 1 },
          transition: {
            pathLength: { delay: delay + extra, duration: 0.9, ease: [0.65, 0, 0.35, 1] as const },
            fillOpacity: { delay: delay + extra + 0.6, duration: 0.5 },
          },
        }
  const detail = reduce
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: delay + 0.9, duration: 0.6 },
      }

  const [lx, ly] = P(W, 0, T / 2)
  const leaderEnd = lx + 74

  return (
    <motion.g style={{ y }}>
      <motion.polygon
        points={left}
        fill={fills.left}
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        {...draw()}
      />
      <motion.polygon
        points={right}
        fill={fills.right}
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        {...draw(0.05)}
      />
      <motion.polygon
        points={top}
        fill={fills.top}
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        {...draw(0.1)}
      />

      <motion.g {...detail}>
        <FaceDetail layer={layer} />
      </motion.g>

      {/* Henvisningslinje og etikett. Skjules på små skjermer, der står
          etikettene i en liste under tegningen. */}
      <motion.g {...detail} className="hidden sm:inline">
        <line x1={lx} y1={ly} x2={leaderEnd} y2={ly} stroke="var(--fg)" strokeWidth="1" />
        <circle cx={lx} cy={ly} r="3" fill="var(--fg)" />
        <text x={leaderEnd + 10} y={ly - 4} className="fill-current text-[13px] font-bold">
          {info.mark}
        </text>
        <text
          x={leaderEnd + 30}
          y={ly - 4}
          fill="var(--fg)"
          className="text-[17px] font-semibold tracking-[-0.01em]"
        >
          {info.label}
        </text>
        <text x={leaderEnd + 30} y={ly + 14} fill="var(--fg-faint)" className="text-[13px]">
          {info.note}
        </text>
      </motion.g>
    </motion.g>
  )
}

/** Innholdet på toppflaten: et skjelett av en nettside, en app og et rack. */
function FaceDetail({ layer }: { layer: Layer }) {
  const z = T
  if (layer === 'site') {
    return (
      <g>
        <polygon points={quad(18, 18, 70, 26, z)} fill="var(--fg)" />
        <polygon points={quad(18, 48, 180, 62, z)} fill="var(--fg)" />
        <polygon points={quad(18, 70, 140, 84, z)} fill="var(--fg)" />
        <polygon points={quad(18, 98, 160, 103, z)} fill="currentColor" opacity="0.35" />
        <polygon points={quad(18, 110, 130, 115, z)} fill="currentColor" opacity="0.35" />
        <polygon points={quad(18, 130, 80, 146, z)} fill="currentColor" />
        <polygon
          points={quad(150, 120, 232, 172, z)}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        <line
          {...lineAt(150, 120, 232, 172, z)}
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.6"
        />
      </g>
    )
  }
  if (layer === 'app') {
    return (
      <g>
        <polygon
          points={quad(0, 0, 56, D, z)}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        {[24, 44, 64].map((y) => (
          <polygon key={y} points={quad(12, y, 44, y + 5, z)} fill="currentColor" opacity="0.4" />
        ))}
        <polygon points={quad(12, 10, 36, 15, z)} fill="currentColor" />
        {[30, 60, 90, 120, 150].map((y, i) => (
          <g key={y}>
            <line
              {...lineAt(72, y, 232, y, z)}
              stroke="currentColor"
              strokeWidth="0.8"
              opacity="0.7"
            />
            <polygon
              points={quad(76, y - 18, 76 + (i % 2 ? 70 : 100), y - 12, z)}
              fill="var(--fg)"
              opacity="0.8"
            />
            <polygon
              points={quad(196, y - 19, 228, y - 11, z)}
              fill={i === 1 ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="0.8"
            />
          </g>
        ))}
      </g>
    )
  }
  return (
    <g>
      {[0, 1, 2, 3].map((i) => {
        const y0 = 18 + i * 42
        const [cx, cy] = P(36, y0 + 15, z)
        return (
          <g key={i}>
            <polygon
              points={quad(18, y0, 232, y0 + 30, z)}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.9"
            />
            <circle cx={cx} cy={cy} r="3" fill="currentColor" />
            {Array.from({ length: 6 }, (_, k) => (
              <polygon
                key={k}
                points={quad(80 + k * 24, y0 + 9, 96 + k * 24, y0 + 21, z)}
                fill="currentColor"
                opacity="0.18"
              />
            ))}
          </g>
        )
      })}
    </g>
  )
}

function lineAt(x0: number, y0: number, x1: number, y1: number, z: number) {
  const [a, b] = P(x0, y0, z)
  const [c, d] = P(x1, y1, z)
  return { x1: a, y1: b, x2: c, y2: d }
}
