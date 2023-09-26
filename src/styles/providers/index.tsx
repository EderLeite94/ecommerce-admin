'use client';

import type { FC, PropsWithChildren } from 'react';

import { NextUIProvider } from '@nextui-org/react';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  );
};

export default Providers;