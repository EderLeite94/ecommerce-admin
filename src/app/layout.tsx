import type { FC, PropsWithChildren } from 'react';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import Providers from '@styles/providers';
import '@styles/global.css';

export const metadata: Metadata = {
  title: 'Sync Admin'
};

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600']
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang='pt-br' className='light'>
      <body className={poppins.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
