/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')


module.exports = { 
  content: [ 
    './components/**/*.{html,js,ts,jsx,tsx}',
    './pages/**/*.{html, js, ts, jsx, tsx}',
    './index.html',
    './dist/**/*.{html,js,ts,jsx,tsx}' ,
    './TS_src/**/*.{html,js,jsx,ts,tsx}'
  ], 
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'amber': '#FFC107'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    spacing: {
      '1': '8px',
      '2': '12px',
      '3': '16px',
      '4': '24px',
      '5': '32px',
      '6': '48px',
    },
    // Extend is to add additional configurations that tailwind already produces
    extend: {}, 
  }, 
  plugins: [], 
};


/*
https://github.com/sanity-io/sanity/issues/3884
https://github.com/tailwindlabs/tailwindcss/issues/6393#issuecomment-1080723375

^ Helped resolve properly updating the tailwind and postcss configuration files


https://stackoverflow.com/questions/69429172/module-not-found-cant-resolve-mui-material-utils-v5-which-included-a-na

^Helped resolve a mui_material_styles where nothing was rendering on the front end after all the updated tailwind/postcss configs

*/
