/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        alabaster: {
          DEFAULT: "#FBF7F1",
          dim: "#F3EDE3",
        },
        ink: {
          DEFAULT: "#241F2A",
          soft: "#453D4C",
          faint: "#7B7284",
        },
        moss: {
          50: "#F1F4EC",
          100: "#DEE5D2",
          300: "#AEBB99",
          500: "#6E7B5C",
          600: "#5A6549",
          700: "#454E39",
        },
        plum: {
          100: "#E9DEE9",
          300: "#C6A8CB",
          500: "#8F6C96",
          600: "#725578",
        },
        gold: {
          200: "#EADFC3",
          400: "#C9A876",
          500: "#B8935A",
          600: "#9A7845",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Manrope'", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 8px 30px -12px rgba(36, 31, 42, 0.15)",
        card: "0 4px 20px -8px rgba(36, 31, 42, 0.12)",
      },
      backgroundImage: {
        "gold-arc": "radial-gradient(circle, rgba(201,168,118,0.16) 0%, rgba(201,168,118,0) 70%)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        rise: "rise 0.7s ease forwards",
        drift: "drift 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
