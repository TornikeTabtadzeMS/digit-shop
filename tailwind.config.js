/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    
    extend: {
      backgroundColor: {
        'primary': '#8a5436',
        'error': '#c31510',
        'light-error': '#E57373',
        'secondary': '#ac8866',
        'success': '#697561',
        'custom-green': '#10b981',
        'custom-red': '#ef4444',
      },
      backgroundImage: {
        'baout_bg': "url('./assets/images/bgForAbout.jpeg')",
        'auth-bg': "url('./assets/images/authBg.jpeg')",
        'main-bg': "url('./assets/images/mainbg.png')"
      },
      colors: {
        'primary': '#8a5436',
        'error': '#c31510',
        'secondary': '#ac8866',
        'success': '#697561',
      }
    },
  },
  plugins: [],
}

