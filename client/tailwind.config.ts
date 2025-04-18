import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["var(--font-Poppins)"],
        Josefin: ["var(--font-Josefin)"],
      },
      transitionDuration: {
        '4000': '4000ms',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        "1000px": "1000px",
        "1100px": "1100px",
        "1200px": "1200px",
        "1300px": "1300px",
        "1500px": "1500px",
        "800px": "800px",
        "400px": "400px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'custom-blue': 'rgba(87,84,236,1)',
        'custom-orange': 'rgb(252, 206, 0)',
        "purple": "#8C52FF",
        "orange": "#FF914D",
      },
      width: {
        '75%': '75%',
        '25%': '25%',
      },
    },
  },
  plugins: [],
} satisfies Config;
