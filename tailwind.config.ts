import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        glow: 'glow 1.6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 6px #3b82f6, 0 0 12px #3b82f6',
          },
          '50%': {
            boxShadow: '0 0 12px #3b82f6, 0 0 24px #3b82f6',
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
