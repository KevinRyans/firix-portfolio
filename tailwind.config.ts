import type { Config } from 'tailwindcss'

/**
 * Apple-inspired design tokens.
 *
 * Colour and type values are modelled on apple.com's public marketing pages:
 * a near-white canvas, a single strong blue for action, and a very tight
 * negative tracking on large display type. Nothing here is branded Apple
 * asset — SF Pro is not licensed for web use, so `fontFamily.sans` resolves
 * to the real system font on Apple devices and falls back to Inter elsewhere.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#fbfbfd',
        surface: '#ffffff',
        muted: '#f5f5f7',
        ink: {
          DEFAULT: '#1d1d1f',
          soft: '#424245',
          faint: '#6e6e73',
          ghost: '#86868b',
        },
        line: {
          DEFAULT: '#d2d2d7',
          soft: '#e8e8ed',
        },
        brand: {
          50: '#eef6ff',
          100: '#d9ecff',
          400: '#2b8bf2',
          500: '#0071e3',
          600: '#0066cc',
          700: '#0055b0',
        },
        positive: '#00875a',
        /**
         * Toneavhengige farger. Verdiene bytter når en seksjon merkes som
         * mørk (se `[data-tone]` i index.css), slik at komponenter som brukes
         * både på lys og mørk bakgrunn ikke trenger egne varianter.
         */
        fg: {
          DEFAULT: 'var(--fg)',
          soft: 'var(--fg-soft)',
          faint: 'var(--fg-faint)',
        },
        ground: 'var(--ground)',
        elevated: 'var(--elevated)',
        hairline: {
          DEFAULT: 'var(--hairline)',
          strong: 'var(--hairline-strong)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          solid: 'var(--accent-solid)',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          'Inter',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        hero: ['clamp(2.375rem, 7vw, 5.5rem)', { lineHeight: '1.04', letterSpacing: '-0.035em' }],
        display: ['clamp(2rem, 5vw, 3.75rem)', { lineHeight: '1.07', letterSpacing: '-0.03em' }],
        headline: [
          'clamp(1.75rem, 3.4vw, 2.75rem)',
          { lineHeight: '1.1', letterSpacing: '-0.025em' },
        ],
        title: ['clamp(1.25rem, 2vw, 1.6rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        lead: ['clamp(1.0625rem, 1.6vw, 1.4rem)', { lineHeight: '1.45', letterSpacing: '-0.01em' }],
        eyebrow: ['0.8125rem', { lineHeight: '1.3', letterSpacing: '0.01em' }],
      },
      maxWidth: {
        page: '1120px',
        prose: '720px',
        narrow: '880px',
      },
      borderRadius: {
        card: '18px',
        panel: '28px',
      },
      boxShadow: {
        card: '0 2px 10px rgba(0,0,0,0.045), 0 12px 32px -18px rgba(0,0,0,0.18)',
        lift: '0 8px 24px rgba(0,0,0,0.07), 0 28px 60px -28px rgba(0,0,0,0.26)',
        chrome: '0 1px 2px rgba(0,0,0,0.06), 0 18px 44px -20px rgba(0,0,0,0.3)',
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.28, 0.11, 0.32, 1)',
      },
      keyframes: {
        // Langsom, nesten umerkelig bevegelse i glødene på mørke seksjoner.
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(0, -18px, 0) scale(1.06)' },
        },
      },
      animation: {
        drift: 'drift 16s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
