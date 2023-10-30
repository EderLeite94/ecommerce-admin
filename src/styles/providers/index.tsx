'use client';

import type { FC, PropsWithChildren } from 'react';

import { NextUIProvider } from '@nextui-org/react';

import { Toaster } from 'sonner';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NextUIProvider>
      {children}
      <Toaster
        position='top-right'
        duration={3000}
      />

    </NextUIProvider>
  );
};

export default Providers;