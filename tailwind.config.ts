import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        'app': {
          '001': 'white',
          '002': '#9290C3',
          '003': '#091414',
          '004': '#366F9F',
          '005': '#FFFFFF80',
          '006': '#F7F9FB',
          '007': '#00000060',
          '008': '#8188dd', // Text, Button
          '009': '#a983da', //Heading
          '010': '#525F60',
          '011': '#000000',
          '012': '#000000',
          '013': '#666666',
          '014': '#14558b',
          '015': '#F1948A',
          '016': '#bd80d9', //Main, Primary
          '017': '#FF095C',
          '018': 'rgb(255 117 117)',
          '019': '#E3E3E3',
          '020': '#FA7070',
          '021': '#9586dc' // Nav
        }
      },
    }
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
