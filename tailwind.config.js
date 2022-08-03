const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      head: ['"Playfair Display"', "ui-sans-serif", "system-ui"],
      sans: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
