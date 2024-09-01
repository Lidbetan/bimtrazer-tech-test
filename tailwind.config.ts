const { nextui } = require("@nextui-org/react");
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        layout: "auto 1fr auto"
      },
      backgroundColor: {
        body: "#F6F5F2"
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
