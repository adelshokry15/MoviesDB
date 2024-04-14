/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shadow: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        videoShow: {
          "0%": { transform: "scale(0.5)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        wiggle: "wiggle 0.4s ease-in-out",
        shadow: "shadow 1s ease-in-out infinite",
        videoShow: "videoShow 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
