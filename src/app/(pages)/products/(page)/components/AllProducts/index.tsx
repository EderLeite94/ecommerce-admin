/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, type FC, useState } from 'react';

import type { IProduct, IUser } from '@models/index';

import { useFetch, useProduct } from '@hooks/index';

import { ProductCard } from '@components/modules';
import { baseURL } from '@constants/api';
import { Input, Pagination, Spinner } from '@nextui-org/react';

import { NoProducts } from '..';

interface AllProductsProps {
  userId: IUser['id'];
}

interface ProductParams {
  name?: string;
  category?: string;
  page?: number;
  limit?: number;
  sortByPrice?: 'asc' | 'desc';
  sortByDate?: 'asc' | 'desc';
}

type DebounceFunction<T extends (...args: any[]) => any> = (
  func: T,
  delay: number
) => (...args: Parameters<T>) => void;

const debounce: DebounceFunction<(...args: any[]) => void> = (func, delay) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const AllProducts: FC<AllProductsProps> = ({ userId }) => {
  const { handleDeletProductById, isLoading } = useProduct();

  const [products, setProducts] = useState<{
    body: IProduct[]; page: number;
    totalPages: number;
    totalProduct: number;
  }>();

  const paramsInitialState: ProductParams = {
    limit: 8,
    page: 1,
    name: '',
    category: '',
    sortByPrice: 'asc',
    sortByDate: 'asc'
  };

  const [params, setParams] = useState<ProductParams>(paramsInitialState);

  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  const handleInputChange = (value: string) => setParams({ ...params, name: value });
  const handleDebouncedInputChange = debounce(handleInputChange, 1000);

  useEffect(() => {
    (async () => {
      setIsLoadingProducts(true);
      try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { data } = await useFetch<{
          body: IProduct[]; page: number;
          totalPages: number;
          totalProduct: number;
        }>(
          `${baseURL}/product/get-all/${userId}?limit=${params.limit}&page=${params.page || 1}&name=${params.name}`,
          'GET'
        );
        setProducts(data);
      } finally {
        setIsLoadingProducts(false);
      }
    })();
  }, [params.limit, params.name, params.page, userId]);

  return (
    <>
      <div className='flex justify-center'>
        {(isLoadingProducts && !products?.body.length) && <Spinner size='lg' />}
      </div>
      {Number(products?.totalProduct) > 0 && (
        <>
          <div className='my-4'>
            <Input
              variant='faded'
              size='sm'
              label='Pesquisa'
              placeholder='Procure algum produto...'
              onChange={(e) => handleDebouncedInputChange(e.target.value)}
              className='text-zinc-700'
            />
          </div>
          <section className='flex flex-wrap justify-around gap-2'>
            {products?.body.map(({ id, name, images, category, productOptions }) => (
              <ProductCard
                key={`product-${id}`}
                name={name}
                imageURL={images[0].url}
                category={category}
                promotionalPrice={productOptions[0].promotionalPrice as number}
                price={productOptions[0].price}
                handleClick={() => handleDeletProductById(userId, id)}
                isLoading={isLoading || isLoadingProducts}
                href={`/products/${id}?userId=${userId}`}
              />
            ))}
          </section>
          <div className='flex justify-center mt-8'>
            <Pagination
              loop
              showControls
              isCompact
              total={products?.totalPages as number}
              initialPage={1}
              isDisabled={isLoadingProducts}
              onChange={(value) => {
                setParams({ ...params, page: value });
                return scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        </>
      )}
      {(!isLoadingProducts && products?.totalProduct === 0) && <NoProducts />}
    </>
  );
};

export default AllProducts;