import type { FC } from 'react';

import NextLink from 'next/link';

import { Link } from '@nextui-org/react';

import { cn } from '@utils/cn';

interface ForgotPasswordProps {
  className?: string;
}

export const ForgotPassword: FC<ForgotPasswordProps> = ({ className }) => {
  return (
    <Link
      href='/recovery-password'
      as={NextLink}
      size='sm'
      underline='always'
      className={cn('mt-4', className)}
    >
      Esqueci minha senha
    </Link>
  );
}; 