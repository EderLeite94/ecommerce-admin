import { Suspense } from 'react';

import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { v4 as uuid } from 'uuid';

import type { ICoupon, IUser, ISearchParams } from '@models/index';

import { baseURL } from '@constants/api';
import { userKey } from '@constants/cookies';

import { useFetch } from '@hooks/index';

import { Await, PagingActions, TableSkeleton } from '@components/elements';
import { AsideLayout } from '@components/layout';

import { Description, Table } from './components';

export const metadata: Metadata = {
  title: 'Todos cupons'
};

const Coupons = async ({ searchParams }: ISearchParams): Promise<JSX.Element> => {
  const { id }: IUser = JSON.parse(cookies().get(userKey)?.value as string);

  const page = Number(searchParams.page) || 1;

  const promise = useFetch<{ body: ICoupon[] }>(
    `${baseURL}/coupon/get-all/${id}?limit=10&page=${page}`,
    'GET'
  );

  return (
    <div key={uuid()}>
      <AsideLayout>
        <Description title={metadata.title as string} />
        <PagingActions
          path='coupons'
          page={page}
        />
        <Suspense fallback={<TableSkeleton />}>
          <Await promise={promise}>
            {({ data }) => <Table userId={id} coupons={data.body} />}
          </Await>
        </Suspense>
      </AsideLayout>
    </div>
  );
};

export default Coupons;