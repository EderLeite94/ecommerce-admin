'use client';

import type { FC } from 'react';

import { Skeleton } from '@nextui-org/react';

const TableSkeleton: FC = () => {
  return (
    <div className='bg-default-300 rounded-xl p-4'>
      <Skeleton className='rounded-lg'>
        <div className='h-12 rounded-lg bg-default-100'></div>
      </Skeleton>
      <div className='flex flex-col gap-4 mt-2 p-4'>
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton
            key={`table-skeleton-${index}`}
            className='rounded-lg'
          >
            <div className='h-6 rounded-lg bg-default-100'></div>
          </Skeleton>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;