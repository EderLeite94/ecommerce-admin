'use client';

import type { FC } from 'react';

import NextLink from 'next/link';

import { Button } from '@nextui-org/react';

import { ArrowLeft, ArrowRight } from 'react-feather';

interface PagingActionsProps {
  page: number;
}

const PagingActions: FC<PagingActionsProps> = ({ page }) => {
  const linkBaseStyles: string = 'bg-zinc-900 text-white uppercase text-sm rounded flex items-center justify-between w-28 p-2';
  const iconBaseStyles: string = 'w-4 h-auto';

  return (
    <div className='flex justify-between gap-4'>
      <Button
        as={NextLink}
        isDisabled={page === 1}
        href={`/coupons?page=${page - 1}`}
        className={linkBaseStyles}
      >
        <ArrowLeft className={iconBaseStyles} /> Anterior
      </Button>
      <Button
        as={NextLink}
        href={`/coupons?page=${page + 1}`}
        className={linkBaseStyles}
      >
        Próximo <ArrowRight className={iconBaseStyles} />
      </Button>
    </div>
  );
};

export default PagingActions;