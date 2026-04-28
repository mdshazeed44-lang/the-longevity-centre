/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        nougat: '#EEE6DB',
        cream: '#FAF6EF',
        rust: '#945455',
        'rust-deep': '#7A4344',
        'rust-soft': '#B27A7B',
        paarl: '#AB542E',
        green: '#323C31',
        'green-soft': '#4A5648',
        iguana: '#A19B7B',
        'iguana-soft': '#C2BC9F',
        ink: '#1B1A18',
        graphite: '#3A3833',
        stone: '#7C7569',
        mist: '#E0DAD0',
        // legacy aliases
        'off-white': '#FAF6EF',
        pearl: '#EEE6DB',
        gold: '#945455',
        'gold-soft': '#B27A7B',
        'gold-glow': '#EEE6DB',
      },
      fontFamily: {
        // primary type — Cabinet Grotesk Variable (everywhere)
        sans: ['Cabinet Grotesk', 'sans-serif'],
        display: ['Cabinet Grotesk', 'sans-serif'],
        editorial: ['Cabinet Grotesk', 'sans-serif'],
        // accent cursive (per brand guide: Alex Brush)
        script: ['Alex Brush', 'cursive'],
      },
      letterSpacing: {
        tightest: '-0.02em',
        widest2: '0.2em',
      },
    },
  },
  plugins: [],
}
