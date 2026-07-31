// Tailwind v4 — the PostCSS plugin is the only thing needed.
// (No autoprefixer entry: Tailwind v4 handles vendor prefixing itself.)
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
