import type { Config } from 'tailwindcss';

import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.tsx',
    './src/components/**/*.tsx'
  ],
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            foreground: '#FFF'
          }
        }
      }
    })
  ]
};

export default config;
