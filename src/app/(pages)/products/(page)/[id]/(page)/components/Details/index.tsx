import type { FC } from 'react';

import type { IProduct } from '@models/product';

import NextImage from 'next/image';

interface DetailsProps {
  product: IProduct;
}

const Details: FC<DetailsProps> = ({ product }) => {
  return (
    <>
      <h1 className='text-zinc-700 text-3xl font-bold'>
        {product.name} <span className='text-zinc-500 text-sm'>({product.category})</span>
      </h1>
      <span className='text-zinc-700 text-sm font-semibold'>
        Quantidade: {product.totalQuantity}
      </span>
      <p className='text-zinc-600 text-lg mt-2'>
        {product.description}
      </p>
      <p className='text-zinc-700 border-l-4 border-zinc-700 text-xl font-bold mt-4 pl-4'>
        Imagens:
      </p>
      <div className='flex flex-wrap gap-4 mt-2'>
        {product.images.map(({ url }, index) => (
          <NextImage
            key={`image-${index}`}
            src={url}
            alt={product.name}
            width='240'
            height='0'
            draggable='false'
            className='rounded-lg object-cover w-full lg:w-56 h-auto'
          />
        ))}
      </div>
      <p className='text-zinc-700 border-l-4 border-zinc-700 text-xl font-bold mt-4 pl-4'>
        Informações adicionais:
      </p>
    </>
  );
};

export default Details;
