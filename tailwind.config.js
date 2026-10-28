/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        redbus: {
          50: '#FDF2F2',
          100: '#FDE8E9',
          200: '#FBD5D5',
          500: '#D84E55',
          600: '#C23E45',
          700: '#A92D34',
          dark: '#1D252C',
        },
        surface: {
          bg: '#F5F6F8',
          card: '#FFFFFF',
          border: '#E5E7EB',
          textDark: '#263238',
          textMuted: '#657078',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 12px rgba(0, 0, 0, 0.06)',
        'elevated': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'red-glow': '0 4px 20px rgba(216, 78, 85, 0.25)',
      }
    },
  },
  plugins: [],
}


