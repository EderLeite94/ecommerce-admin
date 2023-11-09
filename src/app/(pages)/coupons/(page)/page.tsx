import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import type { ICoupon, IUser, ISearchParams } from '@models/index';

import { baseURL } from '@constants/api';
import { userKey } from '@constants/cookies';

import { useFetch } from '@hooks/useFetch';

import { AsideLayout } from '@components/layout';

import { Description, Table } from './components';

export const metadata: Metadata = {
  title: 'Todos cupons'
};

const Coupons = async ({ searchParams }: ISearchParams): Promise<JSX.Element> => {
  const user: IUser = JSON.parse(cookies().get(userKey)?.value as string);

  const page = Number(searchParams.page) || 1;

  const { data } = await useFetch<{ body: ICoupon[] }>(
    `${baseURL}/coupon/get-all/${user.id}?limit=10&page=${page}`,
    'GET'
  );

  return (
    <AsideLayout>
      <Description title={metadata.title as string} />
      <Table
        coupons={data.body}
        page={page}
      />
    </AsideLayout>
  );
};

export default Coupons;