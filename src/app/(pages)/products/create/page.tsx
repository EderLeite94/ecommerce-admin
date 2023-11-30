import type { NextPage, Metadata } from 'next';
import { cookies } from 'next/headers';

import type { IUser } from '@models/index';

import { userKey } from '@constants/cookies';

import { AsideLayout } from '@components/layout';

import { Description, Form } from './components';

export const metadata: Metadata = {
  title: 'Criar produto'
};

const ProductsAdd: NextPage = () => {
  const { id }: IUser = JSON.parse(cookies().get(userKey)?.value as string);

  return (
    <AsideLayout>
      <Description title={metadata.title as string} />
      <Form userId={id} />
    </AsideLayout>
  );
};

export default ProductsAdd;