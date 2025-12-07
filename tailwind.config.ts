import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // KIUL Emerald Palette
        'kiul-emerald': {
          50: 'var(--kiul-emerald-50)',
          100: 'var(--kiul-emerald-100)',
          200: 'var(--kiul-emerald-200)',
          500: 'var(--kiul-emerald-500)',
          600: 'var(--kiul-emerald-600)',
          700: 'var(--kiul-emerald-700)',
          800: 'var(--kiul-emerald-800)',
          900: 'var(--kiul-emerald-900)',
        },
        // KIUL Text Colors
        'kiul-text': {
          dark: 'var(--kiul-text-dark)',
          medium: 'var(--kiul-text-medium)',
          light: 'var(--kiul-text-light)',
        },
        // KIUL Backgrounds
        'kiul-bg': {
          main: 'var(--kiul-bg-main)',
          soft: 'var(--kiul-bg-soft)',
        },
      },
      fontFamily: {
        heading: 'var(--font-heading)',
        body: 'var(--font-body)',
      },
      fontSize: {
        'h1': 'var(--h1-size)',
        'h2': 'var(--h2-size)',
        'h3': 'var(--h3-size)',
        'h4': 'var(--h4-size)',
      },
      spacing: {
        'xs': 'var(--space-xs)',
        'sm': 'var(--space-sm)',
        'md': 'var(--space-md)',
        'lg': 'var(--space-lg)',
        'xl': 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
      },
      borderRadius: {
        'kiul-sm': 'var(--radius-sm)',
        'kiul-md': 'var(--radius-md)',
        'kiul-lg': 'var(--radius-lg)',
        'kiul-xl': 'var(--radius-xl)',
        'kiul-2xl': 'var(--radius-2xl)',
      },
      boxShadow: {
        'kiul-soft': 'var(--kiul-shadow-soft)',
        'kiul-md': 'var(--kiul-shadow-md)',
        'kiul-lg': 'var(--kiul-shadow-lg)',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '300ms',
        'slow': '500ms',
      },
    },
  },
  plugins: [],
};

export default config;
