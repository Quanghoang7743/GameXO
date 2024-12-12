/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        'slow-blink': 'blink 2s ease-in-out infinite',
        // Adjust the speed here
      },

      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.1' },
        },
      },

      background: {
        'image-main': "url('./assets/backgound.png')"
      }
      
    },
  },
  plugins: [],
}