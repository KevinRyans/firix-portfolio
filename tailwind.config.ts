import type { Config } from 'tailwindcss'

/**
 * Designtokens for Firix — «arbeidstegningen».
 *
 * Siden er tegnet som en teknisk tegning: papir med rutenett, blekk for
 * tekst, og én blå strekfarge for alt som er tegnet. Prosjektene står på
 * blåkopi-blått, som en blåkopi av ferdig arbeid. Hjørnene er nesten rette;
 * det er en tegning, ikke en app.
 *
 * Typografien er Schibsted Grotesk, selvhostet — en norsk grotesk tegnet for
 * redaksjonelt bruk. Én familie; vekt og størrelse bærer hierarkiet.
 *
 * Toneavhengige farger (`fg`, `ground`, `accent` …) leser CSS-variabler, så
 * samme komponent fungerer på papir, blåkopi og blekk. Se index.css.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        papir: '#F2F4F6',
        ark: '#FAFBFC',
        blekk: '#0B1020',
        strek: {
          DEFAULT: '#2B3FF5',
          lys: '#D4D9FF',
        },
        blaakopi: '#14207A',
        positive: '#127A4B',

        // Eldre navn som /admin fortsatt bruker.
        canvas: '#FAFBFC',
        surface: '#ffffff',
        muted: '#F2F4F6',
        ink: {
          DEFAULT: '#0B1020',
          soft: '#3B4257',
          faint: '#596075',
          ghost: '#7A8096',
        },
        line: {
          DEFAULT: '#C9CEDA',
          soft: '#DDE1EA',
        },
        brand: {
          50: '#EEF0FF',
          100: '#D4D9FF',
          400: '#5566FF',
          500: '#2B3FF5',
          600: '#1F31D6',
          700: '#1726AD',
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
          on: 'var(--accent-on)',
        },
        rule: 'var(--rule)',
      },
      fontFamily: {
        sans: [
          'Schibsted Grotesk Variable',
          'Schibsted Grotesk',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        hero: ['clamp(2.75rem, 5.2vw, 4.75rem)', { lineHeight: '0.97', letterSpacing: '-0.045em' }],
        display: ['clamp(2.25rem, 4.6vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.04em' }],
        headline: ['clamp(1.75rem, 3.2vw, 2.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        title: ['clamp(1.375rem, 2vw, 1.625rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        lead: ['clamp(1.125rem, 1.5vw, 1.3125rem)', { lineHeight: '1.5', letterSpacing: '-0.005em' }],
        eyebrow: ['0.9375rem', { lineHeight: '1.35' }],
      },
      maxWidth: {
        page: '1320px',
        prose: '660px',
        narrow: '860px',
      },
      borderRadius: {
        card: '3px',
        panel: '4px',
      },
      boxShadow: {
        card: '0 1px 0 rgba(11,16,32,0.06), 0 18px 40px -24px rgba(11,16,32,0.3)',
        lift: '0 2px 0 rgba(11,16,32,0.08), 0 30px 60px -30px rgba(11,16,32,0.45)',
        chrome: '0 1px 0 rgba(11,16,32,0.08), 0 26px 50px -28px rgba(11,16,32,0.5)',
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}

export default config
