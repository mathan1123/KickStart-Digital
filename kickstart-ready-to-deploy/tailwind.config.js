export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0B1220',
          900: '#101A2C',
          800: '#1A2439',
          700: '#2C3852',
          600: '#4A5670',
        },
        paper: {
          DEFAULT: '#FBFBF9',
          100: '#F4F4F0',
          200: '#E8E8E1',
        },
        signal: {
          DEFAULT: '#C6F24E',
          600: '#AFDD34',
          50: '#F1FBD6',
        },
      },
      fontFamily: {
        display: ['"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        shell: '1200px',
      },
      boxShadow: {
        lift: '0 24px 60px -32px rgba(11, 18, 32, 0.35)',
        panel: '0 1px 2px rgba(11,18,32,0.04), 0 12px 32px -20px rgba(11,18,32,0.18)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
}
