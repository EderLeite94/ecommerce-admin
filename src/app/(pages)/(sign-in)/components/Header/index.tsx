import type { FC } from 'react';

import NextImage from 'next/image';

export const Header: FC = () => {
  return (
    <header className='flex flex-col items-center'>
      <NextImage
        src='/medias/logo-white.svg'
        alt='Sync'
        width='0'
        height='0'
        className='mb-6 w-36 h-auto'
        draggable='false'
      />
      <p className='text-zinc-50 text-center mb-4'>
        Insira as informações para acessar sua conta!
      </p>
    </header>
  );
};  