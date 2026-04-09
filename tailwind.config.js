/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // 🔥 THIS FIXES YOUR ISSUE

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {},
  },

  plugins: [],
};
9