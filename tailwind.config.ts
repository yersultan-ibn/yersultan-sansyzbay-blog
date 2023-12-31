import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "post-pattern": "url('/post-pattern.webp')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "gardient-featured": "inset 0px -100px 18px -17px #6246ea",
      },
      plugins: [
        require("tailwind-typewriter")({
          wordsets: {
            fruit: {
              words: ["apple", "banana", "orange", "pear", "strawberry"],
              delay: 3,
            },
          },
        }),
        require("flowbite/plugin"),
      ],
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
