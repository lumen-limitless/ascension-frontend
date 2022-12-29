/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: '#2d1a62',
          100: '#d5d1e0',
          200: '#aba3c0',
          300: '#8176a1',
          400: '#574881',
          500: '#2d1a62',
          600: '#24154e',
          700: '#1b103b',
          800: '#120a27',
          900: '#090514',
        },
        blue: {
          DEFAULT: '#0346a2',
          100: '#cddaec',
          200: '#9ab5da',
          300: '#6890c7',
          400: '#356bb5',
          500: '#0346a2',
          600: '#023882',
          700: '#022a61',
          800: '#011c41',
          900: '#010e20',
        },
        pink: {
          DEFAULT: '#943259',
          100: '#ead6de',
          200: '#d4adbd',
          300: '#bf849b',
          400: '#a95b7a',
          500: '#943259',
          600: '#762847',
          700: '#591e35',
          800: '#3b1424',
          900: '#1e0a12',
        },
        green: {
          DEFAULT: '#31a700',
          100: '#d6edcc',
          200: '#addc99',
          300: '#83ca66',
          400: '#5ab933',
          500: '#31a700',
          600: '#278600',
          700: '#1d6400',
          800: '#144300',
          900: '#0a2100',
        },
        red: {
          DEFAULT: '#ce2116',
          100: '#f5d3d0',
          200: '#eba6a2',
          300: '#e27a73',
          400: '#d84d45',
          500: '#ce2116',
          600: '#a51a12',
          700: '#7c140d',
          800: '#520d09',
          900: '#290704',
        },

        yellow: {
          DEFAULT: '#fcb503',
          100: '#fef0cd',
          200: '#fee19a',
          300: '#fdd368',
          400: '#fdc435',
          500: '#fcb503',
          600: '#ca9102',
          700: '#976d02',
          800: '#654801',
          900: '#322401',
        },

        orange: {
          DEFAULT: '#EF5030',
          50: '#FCE0DA',
          100: '#FBD0C7',
          200: '#F8B0A2',
          300: '#F5907C',
          400: '#F27056',
          500: '#EF5030',
          600: '#D63211',
          700: '#A2260D',
          800: '#6E1A09',
          900: '#3A0D04',
        },
        //'ascend-purple': '#2D1A62',
        //'ascend-magenta': '#943259',
        //'ascend-orange': '#ef5030',
        //'ascend-yellow': '#fcb503',

        primary: '#F9F9F9',
        secondary: '#9F9F9F',
      },
      lineHeight: {
        '48px': '48px',
      },

      fontSize: {
        hero: [
          '48px',
          {
            letterSpacing: '-0.02em;',
            lineHeight: '96px',
            fontWeight: 700,
          },
        ],
      },
      borderRadius: {
        none: '0',
        px: '1px',
        DEFAULT: '0.625rem',
      },
      boxShadow: {
        'pink-glow': '0px 57px 90px -36px rgba(148, 50, 89, 0.15)',
        'pink-glow-hovered': '0px 57px 90px -47px rgba(148, 50, 89, 0.3)',
      },
      ringWidth: {
        DEFAULT: '1px',
      },
      padding: {
        px: '1px',
        '3px': '3px',
      },

      minWidth: {
        5: '1.25rem',
      },

      screens: {
        '3xl': '1600px',
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite',
      },
    },
  },

  plugins: [require('@tailwindcss/forms')],
}
