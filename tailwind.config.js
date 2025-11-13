module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#5C2401',
        primaryDark: '#3B1A00',
        secondary: '#F19C47',
        beige: '#FAF3E0',
        cream: '#FFF6E9',
        lightOnDark: '#FFF5E6'
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    },
  },
  plugins: [],
}
