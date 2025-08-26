// client/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1d4ed8", // A deep blue
        secondary: "#3b82f6", // A lighter blue
        accent: "#60a5fa", // A light accent blue
        background: "#f3f4f6", // A soft gray
        text: "#1f2937", // A dark text color
      },
    },
  },
  plugins: [],
};
