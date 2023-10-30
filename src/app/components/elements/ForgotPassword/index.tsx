import type { FC } from 'react';

import NextLink from 'next/link';

import { cn } from '@utils/cn';

interface ForgotPasswordProps {
  className?: string;
}

export const ForgotPassword: FC<ForgotPasswordProps> = ({ className }) => {
  return (
    <NextLink
      href='/recovery-password'
      className={cn('text-sm underline mt-4', className)}
    >
      Esqueci minha senha
    </NextLink>
  );
}; 