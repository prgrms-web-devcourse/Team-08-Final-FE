/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/ui/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/stories/**/*.{ts,tsx}',
    './.storybook/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': '1.0rem',
        xs: '1.2rem',
        sm: '1.4rem',
        md: '1.6rem',
        lg: '1.8rem',
        xl: '2.0rem',
        '2xl': '2.2rem',
      },
      fontWeight: {
        thin: 100,
        normal: 400,
        bold: 700,
      },
      colors: {
        main: {
          400: '#F5F4EE',
          500: '#FAF0DD',
          600: '#FFD480', // use with opacity 18%
          700: '#FFC073',
          800: '#F6AD55',
          900: '#FFA436',
        },
        warning: {
          700: '#FF8282',
          800: '#F56565',
          900: '#FF0000',
        },
        kakao: '#FEE102',
        kakaotext: '#191600',
        black: {
          200: '#F4F4F4',
          300: '#ECECEC',
          400: '#D9D9D9',
          500: '#8D8D8D',
          600: '#4A4A4A',
          700: '#2D2D2D', // MainText Color
          800: '#191600',
          900: '#000000',
        },
        white: '#FFFFFF',
        background: '#FCFCFC',
        cancel: '#CFCFCF',
        shadow: '#CECECE',
        placeholder: '#AFAFAF', // ( = description)
        overlay: '#494949', // use with opacity 60%
      },
      fontFamily: {
        lineseed: ['var(--font-lineseed)'],
      },
    },
  },
  plugins: [],
};
