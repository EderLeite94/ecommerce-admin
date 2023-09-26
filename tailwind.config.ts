import type { Config } from 'tailwindcss';

import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.tsx'
  ],
  theme: {},
  darkMode: 'class',
  plugins: [nextui()]
};

export default config;
