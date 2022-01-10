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
        "brand-gray-3": "rgba(65, 80, 87, 1)",
        "brand-gray-2": "rgba(108, 133, 146, 1)",
        "brand-gray-1": "rgba(152, 170, 179, 1)",
        "brand-gray": "rgba(239, 243, 244, 1)",
        "brand-primary": "hsla(51, 90%, 58%, 1)",
        "brand-primary-dark": "hsla(51, 90%, 38%, 1)",
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
  plugins: [require("@tailwindcss/typography")],
};
