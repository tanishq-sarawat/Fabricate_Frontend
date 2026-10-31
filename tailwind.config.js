/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        keychain: {
          yellow: '#f5cb39',
          yellowHover: '#ebd034',
          yellowLight: '#fef9e7',
          bg: '#fbfbfa',
          dark: '#111111',
          muted: '#666666',
          border: '#e8e8e5',
          card: '#ffffff',
          pill: '#f4f4f2',
        },
        brand: {
          50: '#fefae8',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f5cb39',
          600: '#d9a918',
          700: '#b4820c',
          800: '#92640e',
          900: '#784e0f',
          950: '#452903',
        },
        slate: {
          50: '#fbfbfa',
          100: '#f4f4f2',
          200: '#e8e8e5',
          300: '#d1d1cc',
          400: '#999994',
          500: '#666666',
          600: '#444442',
          700: '#2b2b2a',
          800: '#1c1c1b',
          900: '#111111',
          950: '#0a0a0a',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        logo: [
          '"Inter"',
          '-apple-system',
          'sans-serif',
        ],
      },
      letterSpacing: {
        'logo-tight': '-0.06em',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'keychain': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'keychain-hover': '0 12px 30px rgba(0, 0, 0, 0.07)',
      }
    },
  },
  plugins: [],
}
