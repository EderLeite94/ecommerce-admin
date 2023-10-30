import type { FC, PropsWithChildren } from 'react';

import { AsideNavigation } from '@components/modules';

import { cn } from '@utils/cn';

interface AsideLayoutProps extends PropsWithChildren {
  className?: string;
}

export const AsideLayout: FC<AsideLayoutProps> = ({ children, className }) => {
  return (
    <div className='bg-zinc-50 flex'>
      <AsideNavigation />
      <main className={cn('mx-auto w-full max-w-5xl p-4', className)}>
        {children}
      </main>
    </div>
  );
};