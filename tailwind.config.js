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
  },
  plugins: [require("daisyui")],  daisyui: {
    themes: [
      {
        financelight: {
          "primary": "#10b981",     // Emerald
          "secondary": "#3b82f6",   // Blue
          "accent": "#8b5cf6",      // Purple
          "neutral": "#1e293b",     // Slate
          "base-100": "#ffffff",    // White
          "base-200": "#f1f5f9",    // Light gray
          "base-300": "#e2e8f0",    // Lighter gray
          "info": "#06b6d4",        // Cyan
          "success": "#22c55e",     // Green
          "warning": "#f59e0b",     // Amber
          "error": "#ef4444",       // Red
        },
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
  }
}
