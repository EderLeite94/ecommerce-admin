'use client';

import type { FC } from 'react';

import NextImage from 'next/image';
import { useRouter } from 'next/navigation';

import { Button, Image, Spinner } from '@nextui-org/react';

import { Trash2, Eye } from 'react-feather';

import { formatCurrencyBRL } from '@utils/formatters/currency';

interface ProductCardProps {
  name: string;
  imageURL: string;
  category: string;
  price: number;
  isLoading: boolean;
  handleClick: () => void;
  href: string;
}

const ProductCard: FC<ProductCardProps> = ({
  name, imageURL, category, price, isLoading, handleClick, href
}) => {
  const { push } = useRouter();

  return (
    <article className='border-zinc-300 border-1 rounded-2xl shadow-md w-full md:w-60 p-1 relative'>
      <Image
        as={NextImage}
        src={imageURL}
        alt={name}
        width='240'
        height='0'
        isZoomed
        isBlurred={isLoading}
        isLoading={isLoading}
        draggable='false'
        className='w-full lg:w-60 h-96'
      />
      <div className='flex flex-col justify-between p-1'>
        <h3 className='text-yellow-700 text-sm font-medium mt-2'>
          {name}
        </h3>
        <span className='text-zinc-700 text-xs font-medium'>
          {category}
        </span>
        <span className='text-zinc-700 mt-2 mb-1'>
          {formatCurrencyBRL(price)}
        </span>
      </div>
      <div className='flex gap-3 absolute top-3 right-3 z-10'>
        <Button
          isIconOnly
          aria-label='Excluir produto'
          className='bg-white w-7 h-8'
          onClick={handleClick}
          isDisabled={isLoading}
        >
          <Trash2 className='stroke-danger-500 w-4 h-auto' />
        </Button>
        <Button
          isIconOnly
          aria-label='Ver produto'
          className='bg-white w-7 h-8'
          onClick={() => push(href)}
          isDisabled={isLoading}
        >
          <Eye className='stroke-zinc-700 w-4 h-auto' />
        </Button>
      </div>
      {isLoading && (
        <Spinner
          color='danger'
          size='lg'
          className='absolute top-1/2 left-1/2 -translate-y-14 -translate-x-1/2 z-10'
        />
      )}
    </article>
  );
};

export default ProductCard;
