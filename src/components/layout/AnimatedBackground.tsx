import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/utils'

const blobBase =
  'absolute rounded-full blur-3xl opacity-60 mix-blend-screen will-change-transform'

const networkNodes = [
  { x: 80, y: 120 },
  { x: 220, y: 180 },
  { x: 360, y: 120 },
  { x: 520, y: 160 },
  { x: 680, y: 110 },
  { x: 860, y: 180 },
  { x: 1040, y: 120 },
  { x: 160, y: 320 },
  { x: 340, y: 300 },
  { x: 520, y: 330 },
  { x: 720, y: 300 },
  { x: 900, y: 360 },
  { x: 1100, y: 320 },
  { x: 120, y: 520 },
  { x: 320, y: 520 },
  { x: 520, y: 540 },
  { x: 740, y: 520 },
  { x: 940, y: 560 },
  { x: 1140, y: 520 },
  { x: 220, y: 680 },
  { x: 520, y: 700 },
  { x: 820, y: 680 },
  { x: 1080, y: 700 },
]

const networkLinks = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [0, 7],
  [1, 8],
  [2, 8],
  [2, 9],
  [3, 9],
  [4, 10],
  [5, 11],
  [6, 12],
  [7, 8],
  [8, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [7, 13],
  [8, 14],
  [9, 15],
  [10, 16],
  [11, 17],
  [12, 18],
  [13, 14],
  [14, 15],
  [15, 16],
  [16, 17],
  [17, 18],
  [14, 19],
  [15, 20],
  [16, 21],
  [17, 22],
  [19, 20],
  [20, 21],
  [21, 22],
  [1, 9],
  [4, 10],
  [5, 17],
]

const accentNodes = new Set([2, 5, 9, 15, 20, 21])

function NetworkSvg({ accent = false }: { accent?: boolean }) {
  const lineColor = accent ? 'rgba(56, 189, 248, 0.32)' : 'rgba(148, 163, 184, 0.25)'
  const dotColor = accent ? 'rgba(45, 212, 191, 0.55)' : 'rgba(148, 163, 184, 0.45)'
  const strokeWidth = accent ? 1.0 : 0.8

  return (
    <svg
      viewBox="0 0 1200 800"
      className="h-full w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke={lineColor} strokeWidth={strokeWidth} strokeLinecap="round">
        {networkLinks.map(([from, to], index) => (
          <line
            key={`${from}-${to}-${index}`}
            x1={networkNodes[from].x}
            y1={networkNodes[from].y}
            x2={networkNodes[to].x}
            y2={networkNodes[to].y}
          />
        ))}
      </g>
      <g fill={dotColor}>
        {networkNodes.map((node, index) => (
          <circle
            key={`${node.x}-${node.y}-${index}`}
            cx={node.x}
            cy={node.y}
            r={accentNodes.has(index) ? 3.2 : 2.4}
            opacity={accentNodes.has(index) ? 0.9 : 0.7}
          />
        ))}
      </g>
    </svg>
  )
}

export default function AnimatedBackground() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute inset-0 geo-grid opacity-45 animate-gridShift motion-reduce:animate-none" />
      <div className="absolute inset-0 geo-grid-soft opacity-30 animate-gridShift motion-reduce:animate-none" />
      <motion.div
        className="absolute inset-0 opacity-35"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, -14, 0],
                y: [0, 10, 0],
              }
        }
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      >
        <NetworkSvg />
      </motion.div>
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, 12, 0],
                y: [0, -8, 0],
              }
        }
        transition={{ duration: 38, repeat: Infinity, ease: 'easeInOut' }}
      >
        <NetworkSvg accent />
      </motion.div>
      <div className="absolute inset-0 opacity-35">
        <div className="absolute left-[10%] top-[16%] h-48 w-48 rounded-[26px] border border-accent-500/20 bg-accent-500/8 animate-spinSlower motion-reduce:animate-none" />
        <div className="absolute right-[12%] top-[28%] h-64 w-64 rounded-full border border-teal-400/20 bg-teal-400/8 animate-orbit motion-reduce:animate-none" />
        <div className="absolute bottom-[14%] left-[18%] h-28 w-28 rotate-12 rounded-2xl border border-white/15 bg-white/8 animate-drift motion-reduce:animate-none" />
      </div>
      <motion.div
        className={cn(blobBase, 'left-[12%] top-[20%] h-72 w-72 bg-accent-500/25')}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                y: [0, -20, 0],
                x: [0, 10, 0],
              }
        }
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={cn(blobBase, 'right-[8%] top-[8%] h-80 w-80 bg-teal-400/25')}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                y: [0, 30, 0],
                x: [0, -20, 0],
              }
        }
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
