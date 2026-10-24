/**
 * Tailwind configuration.
 *
 * Every colour is bound to a CSS custom property that lives in `src/index.css`.
 * The `[data-theme]` attribute on <html> swaps the whole palette, so a single
 * set of utility classes renders correctly in both dark and light mode.
 *
 * Colours use the `rgb(var(--token) / <alpha-value>)` pattern so that opacity
 * modifiers (`bg-accent/10`, `border-border/60`, ...) keep working.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: ['variant', '&:where([data-theme="dark"], [data-theme="dark"] *)'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        bg2: 'rgb(var(--bg-2) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        surface2: 'rgb(var(--surface-2) / <alpha-value>)',
        surface3: 'rgb(var(--surface-3) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        hairline: 'var(--hairline)',
        softborder: 'var(--soft-border)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-ink': 'rgb(var(--accent-ink) / <alpha-value>)',
        accent2: 'rgb(var(--accent-2) / <alpha-value>)',
        accentsoft: 'rgb(var(--accent-soft) / <alpha-value>)',
        onaccent: 'rgb(var(--on-accent) / <alpha-value>)',
        heading: 'rgb(var(--text) / <alpha-value>)',
        body: 'rgb(var(--muted) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        eyebrow: ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.18em' }],
        mono: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.02em' }],
      },
      borderRadius: {
        card: '18px',
        pill: '9999px',
      },
      maxWidth: {
        shell: '1100px',
      },
      spacing: {
        section: '96px',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        lift: 'var(--shadow-lift)',
        glow: 'var(--shadow-glow)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(22px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(0.82)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'rise': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 26s linear infinite',
        rise: 'rise 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
