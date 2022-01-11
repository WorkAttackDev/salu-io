const fadeInKeyFrames = {
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
};

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./features/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        "brand-gray-3": "#38323B",
        "brand-gray-2": "#585F69",
        "brand-gray-1": "#BDC0C4",
        "brand-gray": "rgba(239, 243, 244, 1)",
        "brand-primary": "hsla(51, 90%, 58%, 1)",
        brand: "#ff811c",
        "brand-dark": "#1e252b",
      },
      borderRadius: {
        base: "2rem",
      },
      keyframes: {
        fadeInKeyFrames,
      },
      animation: {
        fadeIn: "fadeInKeyFrames 1s ease-out",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
