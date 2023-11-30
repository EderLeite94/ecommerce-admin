import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import type { ICategory, IUser } from '@models/index';

import { userKey } from '@constants/cookies';
import { baseURL } from '@constants/api';

import useFetch from '@hooks/useFetch';

import { AsideLayout } from '@components/layout';

import { Description, Form } from './components';

export const metadata: Metadata = {
  title: 'Criar produto'
};

const ProductsAdd = async () => {
  const { id }: IUser = JSON.parse(cookies().get(userKey)?.value as string);

  const { data } = await useFetch<{ body: ICategory[] }>(
    `${baseURL}/category/get-all/${id}?limit=100`,
    'GET'
  );

  return (
    <AsideLayout>
      <Description title={metadata.title as string} />
      <Form
        userId={id}
        categories={data.body}
      />
    </AsideLayout>
  );
};

export default ProductsAdd;