import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';

import type { IUser, ISearchParams } from '@models/index';

import { baseURL } from '@constants/api';
import { userKey } from '@constants/cookies';

import { useFetch } from '@hooks/index';

import { AsideLayout } from '@components/layout';

import { Form } from './components';

import type { TProducts } from './components/Form/utils';

type Props = {
  params: { id: string }
  searchParams: ISearchParams['searchParams'];
}

export const generateMetadata = async ({ params, searchParams }: Props): Promise<Metadata> => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = await useFetch<{ body: TProducts }>(
    `${baseURL}/product/get-by-id/${searchParams.userId}/${params.id}`,
    'GET'
  );

  return {
    title: data.body.name,
    description: data.body.description
  };
};

const ProductsId = async () => {
  const { id }: IUser = JSON.parse(cookies().get(userKey)?.value as string);

  const productId = headers().get('next-url')?.split('/')[2];

  return (
    <AsideLayout>
      <Form
        userId={id}
        productId={productId}
      />
    </AsideLayout>
  );
};

export default ProductsId;