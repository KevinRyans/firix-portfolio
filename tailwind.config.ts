import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        slate: colors.slate,
        base: {
          950: '#09090e',
          900: '#0e0e18',
          800: '#111118',
          700: '#1c1c28',
        },
        surface: {
          DEFAULT: '#111118',
          soft: '#0e0e18',
          glow: '#13131f',
        },
        accent: {
          300: '#b3ffe0',
          400: '#7fffb2',
          500: '#5dde96',
          600: '#3db36f',
        },
        teal: {
          300: '#a3baff',
          400: '#5b8cff',
          500: '#3a6ade',
        },
        border: '#1c1c28',
        glow: 'rgba(127, 255, 178, 0.35)',
      },
      fontFamily: {
        sans: ['DM Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        mono: ['DM Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        display: ['Syne', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 50px -30px rgba(9, 9, 14, 0.9)',
        glow: '0 0 0 1px rgba(127, 255, 178, 0.12), 0 0 30px rgba(127, 255, 178, 0.15)',
        lift: '0 18px 40px -20px rgba(9, 9, 14, 0.95)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -12px, 0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(0, -18px, 0) rotate(6deg)' },
        },
        gridShift: {
          '0%': { backgroundPosition: '0 0, 0 0' },
          '100%': { backgroundPosition: '160px 160px, -160px -160px' },
        },
        orbit: {
          '0%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '100%': { transform: 'translate3d(0, 0, 0) rotate(360deg)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.9' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 10s ease-in-out infinite',
        slowFloat: 'float 18s ease-in-out infinite',
        drift: 'drift 14s ease-in-out infinite',
        gridShift: 'gridShift 40s linear infinite',
        orbit: 'orbit 22s linear infinite',
        spinSlower: 'spinSlow 28s linear infinite',
        spinFast: 'spinSlow 7s linear infinite',
        pulseGlow: 'pulseGlow 6s ease-in-out infinite',
        shimmer: 'shimmer 2.4s ease-in-out infinite',
        pulseRing: 'pulseRing 1.8s ease-out infinite',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(circle at top, rgba(127,255,178,0.08), transparent 60%), radial-gradient(circle at 20% 20%, rgba(91,140,255,0.1), transparent 50%)',
      },
    },
  },
  plugins: [typography],
}

export default config
