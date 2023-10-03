import { clsx } from 'clsx';

import { twMerge, type ClassNameValue } from 'tailwind-merge';

export const cn = (...inputs: ClassNameValue[]): string => {
  return twMerge(clsx(...inputs));
};