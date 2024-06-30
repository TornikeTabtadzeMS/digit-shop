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
        'info': '#3056CF',
        'custom-green': '#00425B',
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

