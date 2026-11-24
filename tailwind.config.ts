import type { Config } from 'tailwindcss'

/**
 * Designtokens for Firix.
 *
 * Paletten er hentet fra kysten utenfor Tønsberg: lys, kjølig fjellgrå som
 * flate, dyp fjordgrønn som mørk tone, og signaloransje — fargen på bøyer og
 * redningsvester — som den ene fargen som betyr «gjør noe her».
 *
 * Typografien er Familjen Grotesk, selvhostet. Én familie for alt; vekt og
 * størrelse bærer hierarkiet.
 *
 * Toneavhengige farger (`fg`, `ground`, `accent` …) leser CSS-variabler, så
 * samme komponent fungerer både på lys og mørk seksjon. Se `[data-tone]` i
 * index.css.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Faste merkefarger.
        fjell: '#E9EDE8',
        papir: '#F7F9F5',
        blekk: '#10201C',
        fjord: {
          DEFAULT: '#0F4542',
          deep: '#0A302E',
        },
        signal: {
          DEFAULT: '#FF5A1F',
          deep: '#B23A0B',
        },
        positive: '#1F7A4D',

        // Eldre navn som /admin fortsatt bruker.
        canvas: '#F7F9F5',
        surface: '#ffffff',
        muted: '#E9EDE8',
        ink: {
          DEFAULT: '#10201C',
          soft: '#33433E',
          faint: '#5A6863',
          ghost: '#7C8A85',
        },
        line: {
          DEFAULT: '#C9D2CC',
          soft: '#DDE3DE',
        },
        brand: {
          50: '#FFF1EB',
          100: '#FFDCCB',
          400: '#FF7A47',
          500: '#C9410E',
          600: '#A3340B',
          700: '#A3340B',
        },

        // Toneavhengige.
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
          'Familjen Grotesk Variable',
          'Familjen Grotesk',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        // Skala med forhold ~1.25, med en hero som får lov til å være stor.
        hero: ['clamp(2.75rem, 7.6vw, 6.5rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        display: ['clamp(2.125rem, 5vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.035em' }],
        headline: [
          'clamp(1.75rem, 3.4vw, 2.625rem)',
          { lineHeight: '1.05', letterSpacing: '-0.03em' },
        ],
        title: [
          'clamp(1.375rem, 2.2vw, 1.75rem)',
          { lineHeight: '1.15', letterSpacing: '-0.02em' },
        ],
        lead: [
          'clamp(1.125rem, 1.6vw, 1.375rem)',
          { lineHeight: '1.45', letterSpacing: '-0.005em' },
        ],
        eyebrow: ['0.9375rem', { lineHeight: '1.35' }],
      },
      maxWidth: {
        page: '1240px',
        prose: '680px',
        narrow: '860px',
      },
      borderRadius: {
        card: '10px',
        panel: '14px',
      },
      boxShadow: {
        // Skygger er farget av fjorden, ikke grå.
        card: '0 1px 2px rgba(10,48,46,0.08), 0 16px 36px -20px rgba(10,48,46,0.35)',
        lift: '0 2px 6px rgba(10,48,46,0.1), 0 30px 60px -30px rgba(10,48,46,0.5)',
        chrome: '0 1px 2px rgba(10,48,46,0.1), 0 24px 48px -24px rgba(10,48,46,0.45)',
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        blink: {
          '0%, 92%, 100%': { opacity: '1' },
          '96%': { opacity: '0.25' },
        },
      },
      animation: {
        blink: 'blink 3.2s steps(1, end) infinite',
      },
    },
  },
  plugins: [],
}

export default config
