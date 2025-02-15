'use client';

import type { FC } from 'react';

import { Button, type ButtonProps } from '@nextui-org/react';

import { cn } from '@utils/cn';

interface SubmitButtonProps extends ButtonProps {
  title: string;
  className?: string;
}

const SubmitButton: FC<SubmitButtonProps> = ({ title, className, ...props }) => {
  return (
    <Button
      type='submit'
      color='primary'
      className={cn('uppercase font-semibold mx-auto mt-4 py-unit-lg w-60', className)}
      {...props}
    >
      {title}
    </Button>
  );
};

export default SubmitButton;