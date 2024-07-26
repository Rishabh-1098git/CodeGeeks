/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #282828 0%, #282828 100%)',
        'black-bg': 'linear-gradient(to right, #1a1a1a 0%, #1a1a1a 100%)',
        'home-gradient' : 'linear-gradient(-150deg, #222222 15%, #373737 70%, #3c4859 94%)',
        'feature-gradient' : 'linear-gradient(45deg, #8baaaa 0%, #ae8b9c 100%)'
      },
      colors: {
         'custom-dark-gray': 'rgb(40, 40, 40)',
        'sd-easy': '#00bcd4',
        'sd-medium': '#f7b52d', // Converted from HSL 43 100% 50%
        'sd-hard': '#ff6f6f', // Using HEX
        'light-cyan' : '#E0F7FA',
        'cyan' : '#006064',
        'light-gray': '#F5F5F5',
        'dark-gray' : '#333333'
      },
      boxShadow: {
        'sd-easy': '0 4px 8px rgba(0, 188, 212, 0.2)', // Light shadow with 'sd-easy' color
        'sd-medium': '0 4px 8px rgba(247, 181, 45, 0.2)', // Light shadow with 'sd-medium' color
        'sd-hard': '0 4px 8px rgba(255, 111, 111, 0.2)' // Light shadow with 'sd-hard' color
      },
    },
  },
  plugins: [],
}

