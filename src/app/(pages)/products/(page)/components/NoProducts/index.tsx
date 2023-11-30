import type { FC } from 'react';

import NextImage from 'next/image';
import NextLink from 'next/link';

const NoProducts: FC = () => {
  return (
    <div className='flex flex-col items-center'>
      <NextImage
        src='/images/shopping.svg'
        alt='Nenhum produto criado!'
        width='0'
        height='0'
        className='my-6 w-96 h-auto'
        draggable='false'
      />
      <span className='text-zinc-700 text-xl font-semibold'>
        Nenhum produto criado!
      </span>
      <NextLink
        href='/products/create'
        className='bg-zinc-900 rounded-md mt-4 p-2'
      >
        Criar produto
      </NextLink>
    </div>
  );
};

export default NoProducts;
