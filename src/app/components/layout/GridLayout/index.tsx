import type { FC, PropsWithChildren } from 'react';

import { cn } from '@utils/cn';

interface GridLayoutProps extends PropsWithChildren {
  cols?: '2' | '3';
  className?: string;
}

const GridLayout: FC<GridLayoutProps> = ({ children, cols = '2', className }) => {
  return (
    <div className={cn('grid gap-4', cols === '2' ? 'grid-cols-2' : 'grid-cols-3', className)}>
      {children}
    </div>
  );
};

export default GridLayout;