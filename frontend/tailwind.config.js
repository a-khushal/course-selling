/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '600': '600px',
        '1000': '1000px',
         '500': "500px",
         '800': '800px',
         '700': '700px',
         '750': '750px',
      }
    },
  },
  plugins: [],
}