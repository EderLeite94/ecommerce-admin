import type { FC, PropsWithChildren } from 'react';

import { cn } from '@utils/cn';

interface HalfToHalfProps extends PropsWithChildren {
  className?: string;
}

export const HalfToHalf: FC<HalfToHalfProps> = ({ children, className }) => {
  return (
    <div className={cn('grid grid-cols-2 gap-4', className)}>
      {children}
    </div>
  );
};