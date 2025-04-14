const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require("tailwindcss/colors");

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        zinc: colors.zinc,
        emerald: colors.emerald,
      }
    },
  },
  plugins: [],
});
