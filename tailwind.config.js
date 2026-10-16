/** @type {import('tailwindcss').Config} */
export default { content: ['./index.html', './src/**/*.{js,jsx}'], theme: { extend: {
  colors: { ink:'#080C13', cyan:'#52E5E7', violet:'#9575F5' },
  fontFamily: { display:['Space Grotesk','sans-serif'], body:['Inter','sans-serif'] }
} }, plugins: [] };
