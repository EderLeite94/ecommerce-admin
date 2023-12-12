import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import type { IUser } from '@models/index';

import { userKey } from '@constants/cookies';

import { AsideLayout } from '@components/layout';

import { Description, AllProducts } from './components';

export const metadata: Metadata = {
  title: 'Todos produtos'
};

const Products = async () => {
  const { id }: IUser = JSON.parse(cookies().get(userKey)?.value as string);

  return (
    <AsideLayout>
      <Description title={metadata.title as string} />
      <AllProducts userId={id} />
    </AsideLayout>
  );
};

export default Products;