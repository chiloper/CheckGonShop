import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-prompt)', 'Prompt', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        shopee: {
          DEFAULT: '#ee4d2d',
          light: '#fff5f1',
          dark: '#d03b1f',
        },
        lazada: {
          DEFAULT: '#0f146d',
          accent: '#f57224',
          light: '#f0f3ff',
        },
        tiktok: {
          DEFAULT: '#000000',
          cyan: '#25f4ee',
          pink: '#fe2c55',
          light: '#f8f8f8',
        },
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        }
      },
      boxShadow: {
        'card': '0 2px 12px -2px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 12px 24px -4px rgba(0, 0, 0, 0.12), 0 6px 12px -4px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
};

export default config;
