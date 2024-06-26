import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background color
        background: {
          DEFAULT: "#F1F3F9",
          dark: "#202020",
        },

        // Primary color
        primary: {
          DEFAULT: "#4ACCBF",
          dark: "#961623",
        },

        // Dropdown Menu color
        dropdown: {
          DEFAULT: "#DCDDE0",
          dark: "#231E1B",
        },

        // Background for theme switcher
        switch_bg: {
          DEFAULT: "#F1F3F9",
          dark: "#202020",
        },

        // Text color
        text: {
          DEFAULT: "#1A202C",
          dark: "#F8FAFC",
        },

        // Background color for cards
        card_bg: {
          DEFAULT: "#FFFFFF",
          dark: "#1A202C",
        },

        // Button color
        button_bg: {
          DEFAULT: "#3662E3",
          dark: "#739CCA",
        },

        // focus color
        focus_border: {
          DEFAULT: "#1D5194",
          dark: "#1D5194",
        },

        // ================================= TASKS COLORS =======================================

        // tasks emoji color
        todo_emoji_bg: {
          DEFAULT: "#E3E8EF",
          dark: "#2D3748",
        },

        // tasks to do background
        todo_bg: {
          DEFAULT: "#E3E8EF",
          dark: "#2D3748",
        },

        //tasks not do background
        todo_not_bg: {
          DEFAULT: "#F7D4D3",
          dark: "#E53E3E",
        },
        todo_not_icon_bg: {
          DEFAULT: "#DD524C",
          dark: "#E53E3E",
        },

        // tasks in progress background
        progress_bg: {
          DEFAULT: "#F5D565",
          dark: "#2D3748",
        },
        progress_icon_bg: {
          DEFAULT: "#E9A23B",
          dark: "#2D3748",
        },

        // tasks done background
        completed_bg: {
          DEFAULT: "#A0ECB1",
          dark: "#2F855A",
        },
        completed_icon_bg: {
          DEFAULT: "#32D657",
          dark: "#2F855A",
        },

        // add tasks background
        add_todo_bg: {
          DEFAULT: "#F5E8D5",
          dark: "#2D3748",
        },
        add_todo_icon_bg: {
          DEFAULT: "#E9A23B",
          dark: "#2D3748",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [daisyui],
  darkMode: "class",
};
export default config;
