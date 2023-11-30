import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { v4 as uuid } from 'uuid';

import type { IUser, IProduct } from '@models/index';

import { baseURL } from '@constants/api';
import { userKey } from '@constants/cookies';

import { useFetch } from '@hooks/index';

import { AsideLayout } from '@components/layout';

import { Description, AllProducts, NoProducts } from './components';

export const metadata: Metadata = {
  title: 'Todos produtos'
};

const Products = async () => {
  const { id }: IUser = JSON.parse(cookies().get(userKey)?.value as string);

  const { data } = await useFetch<{ body: IProduct[] }>(
    `${baseURL}/product/get-all/${id}?limit=100`,
    'GET'
  );

  return (
    <div key={uuid()}>
      <AsideLayout>
        <Description title={metadata.title as string} />
        {data.body.length ? <AllProducts userId={id} products={data.body} /> : <NoProducts />}
      </AsideLayout>
    </div>
  );
};

export default Products;