/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blob': 'blob 7s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
      },
    },
  },  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        financedark: {
          "primary": "#34d399",     // Lighter emerald
          "secondary": "#60a5fa",   // Lighter blue
          "accent": "#a78bfa",      // Lighter purple
          "neutral": "#334155",     // Lighter slate
          "base-100": "#1e293b",    // Slate
          "base-200": "#0f172a",    // Darker slate
          "base-300": "#020617",    // Nearly black
          "info": "#67e8f9",        // Lighter cyan
          "success": "#4ade80",     // Lighter green
          "warning": "#fcd34d",     // Lighter yellow
          "error": "#f87171",       // Lighter red
        }
      }
    ],
    darkTheme: "financedark",
    base: true,
  }
}
