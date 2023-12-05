'use client';

import type { FC } from 'react';

import type { IUser, IProduct } from '@models/index';

import { useProduct } from '@hooks/index';

import { ProductCard } from '@components/modules';

interface AllProductsProps {
  userId: IUser['id'];
  products: IProduct[];
}

const AllProducts: FC<AllProductsProps> = ({ userId, products }) => {
  const { handleDeletProductById, isLoading } = useProduct();

  return (
    <section className='flex flex-wrap justify-around gap-2'>
      {products.map(({ id, name, images, category, productOptions }) => (
        <ProductCard
          key={`product-${id}`}
          name={name}
          imageURL={images[0].url}
          category={category}
          price={productOptions[0].price}
          handleClick={() => handleDeletProductById(userId, id)}
          isLoading={isLoading}
          href={`/products/${id}?userId=${userId}`}
        />
      ))}
    </section>
  );
};

export default AllProducts;