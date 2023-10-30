import type { FC, PropsWithChildren } from 'react';

import { cn } from '@utils/cn';

interface FieldsetProps extends PropsWithChildren {
  legend: string;
  fieldsetCn?: string;
  legendCn?: string;
}

export const Fieldset: FC<FieldsetProps> = ({ children, legend, fieldsetCn, legendCn }) => {
  return (
    <fieldset className={cn('flex flex-col gap-4', fieldsetCn)}>
      <legend className={cn('text-zinc-900 font-semibold border-l-4 border-l-zinc-900 pl-2 mb-2', legendCn)}>
        {legend}
      </legend>
      {children}
    </fieldset>
  );
};