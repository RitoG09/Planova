import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#11131c",
        surface: "#1d1f29",
        card: "#f5f5f5",

        primary: "#2d5bff",
        secondary: "#c1ff72",

        foreground: "#e2e1ef",
        muted: "#8e90a2",
        border: "#2b2b2b",
      },

      boxShadow: {
        neo: "4px 4px 0px 0px rgba(0,0,0,1)",
        "neo-lg": "8px 8px 0px 0px rgba(0,0,0,1)",
      },

      borderRadius: {
        neo: "16px",
      },

      fontFamily: {
        jakarta: ["Plus Jakarta Sans"],
        inter: ["Inter"],
        grotesk: ["Space Grotesk"],
      },
    },
  },
}

export default config
