/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // IMPORTANT: Changed this line
    '@tailwindcss/postcss': {}, 
    autoprefixer: {},
  },
};

export default config;