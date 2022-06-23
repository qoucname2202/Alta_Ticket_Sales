/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ff7506',
        secondary: '#A9A9B0',
        green: '#03AC00',
        // 'yellow/0.5': '#F7F8FB',
        'primary-100': '#FFBA7B',
        'primary-200': '#FF993C',
        'primary-300': '#FF9138',
        'primary-400': '#FFB800',
        'primary-500': '#C55E00',
        'primary-600': '#FD5959',
        'grey-200': '#F1F4F8',
        'grey-300': '#F7F8FB',
        'grey-400': '#A5A8B1',
        'grey-500': '#919DBA',
        'grey-background': '#EAF1F8',
        'red-background': '#F8EBE8',
        'dashboard-background': '#F9F6F4',
        'chart-linear':
          'linear-gradient(180deg, rgba(250, 160, 95, 0.26) 0%, rgba(255, 255, 255, 0) 141.68%)',
        'chart-donut-1': '#FF8A48',
        'chart-donut-2': '#4F75FF',
      },
    },
    screens: {
      '4xl': { max: '1920px' },
      '3xl': { max: '1600px' },
      '2xl': { max: '1440px' },
      // => @media (max-width: 1440px) { ... }

      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      md: { max: '767px' },
      // => @media (max-width: 767px) { ... }

      sm: { max: '639px' },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
