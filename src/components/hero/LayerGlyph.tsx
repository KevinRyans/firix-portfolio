import type { Layer } from '../../content/site'

const COLORS: Record<Layer, [string, string, string]> = {
  site: ['#F7F9F5', '#C9D2CC', '#B4C0B9'],
  app: ['#0F4542', '#0A302E', '#082624'],
  server: ['#10201C', '#0A1512', '#070F0D'],
}

/**
 * Liten, flat utgave av en plate fra stabelen i hero. Markerer hvilket lag
 * en tjeneste hører til, og fremhever laget i en stabel på tre.
 */
export default function LayerGlyph({ layer, className }: { layer: Layer; className?: string }) {
  const order: Layer[] = ['server', 'app', 'site']
  return (
    <svg viewBox="0 0 48 52" className={className} aria-hidden="true">
      {order.map((item, i) => {
        const [top, left, right] = COLORS[item]
        const y = 28 - i * 12
        const active = item === layer
        return (
          <g key={item} opacity={active ? 1 : 0.22}>
            <polygon points={`4,${y + 10} 24,${y + 20} 24,${y + 25} 4,${y + 15}`} fill={left} />
            <polygon points={`24,${y + 20} 44,${y + 10} 44,${y + 15} 24,${y + 25}`} fill={right} />
            <polygon
              points={`24,${y} 44,${y + 10} 24,${y + 20} 4,${y + 10}`}
              fill={top}
              stroke={item === 'site' ? '#B4C0B9' : 'none'}
              strokeWidth="0.75"
            />
            {active && item === 'site' ? (
              <polygon
                points={`21,${y + 11} 27,${y + 14} 24,${y + 15.5} 18,${y + 12.5}`}
                fill="#FF5A1F"
              />
            ) : null}
          </g>
        )
      })}
    </svg>
  )
}
