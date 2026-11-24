import type { Layer } from '../../content/site'

const COS = Math.cos(Math.PI / 6)
const SIN = Math.sin(Math.PI / 6)
const W = 60
const D = 46
const T = 4

const P = (x: number, y: number, z: number) =>
  `${(44 + (x - y) * COS).toFixed(1)},${(40 + (x + y) * SIN - z).toFixed(1)}`

/**
 * Liten strektegning av stabelen fra forsiden, med ett lag uthevet. Viser
 * hvilket lag en tjeneste hører til.
 */
export default function LayerMark({ layer, className }: { layer: Layer; className?: string }) {
  const order: Layer[] = ['server', 'app', 'site']
  return (
    <svg viewBox="0 0 104 130" className={className} aria-hidden="true">
      {order.map((item, i) => {
        const z = -30 + i * 30
        const active = item === layer
        const top = [P(0, 0, z + T), P(W, 0, z + T), P(W, D, z + T), P(0, D, z + T)].join(' ')
        const left = [P(0, D, z + T), P(W, D, z + T), P(W, D, z), P(0, D, z)].join(' ')
        const right = [P(W, 0, z + T), P(W, D, z + T), P(W, D, z), P(W, 0, z)].join(' ')
        return (
          <g
            key={item}
            stroke="currentColor"
            strokeWidth={active ? 1.4 : 0.9}
            strokeLinejoin="round"
            strokeDasharray={active ? undefined : '2.5 3'}
            opacity={active ? 1 : 0.55}
          >
            <polygon points={left} fill={active ? 'currentColor' : 'none'} fillOpacity={0.35} />
            <polygon points={right} fill={active ? 'currentColor' : 'none'} fillOpacity={0.55} />
            <polygon points={top} fill={active ? 'var(--elevated)' : 'none'} />
          </g>
        )
      })}
    </svg>
  )
}
