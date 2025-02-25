/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@solana/wallet-adapter-react-ui/styles.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        handwritten: ['Patrick Hand','sans-serif'],
        roboto: ['Roboto','sans-serif'], // Add your font family here
      },
      textShadow: {
        white: '2px 2px 0 rgba(255, 255, 255, 0.7)', // Customize the shadow as needed
        DEFAULT: '2px 2px 0 rgba(0, 0, 0, 0.5)',
      },
      screens: {
        'xs': '375px',
      },
      colors: {
        cA: '#97e92e',
        cB: '#1e5324',
        cC: 'white',
        cD: '#bbf7d0',
      }
    },
  },
  plugins: [
    require('tailwindcss-textshadow'), // Add the text shadow plugin
  ],
}