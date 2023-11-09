import type { FC, ReactNode } from 'react';

import { cn } from '@utils/cn';

interface TitleProps {
  icon: ReactNode;
  title: string;
  className?: string;
}

const Title: FC<TitleProps> = ({ icon, title, className }) => {
  return (
    <h1 className={cn('flex items-center gap-2 text-zinc-900 text-3xl font-semibold mb-6', className)}>
      {icon} {title}
    </h1>
  );
};

export default Title;