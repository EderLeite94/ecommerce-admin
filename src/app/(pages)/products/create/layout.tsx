import type { FC, PropsWithChildren } from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criar produto'
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
};

export default RootLayout;
