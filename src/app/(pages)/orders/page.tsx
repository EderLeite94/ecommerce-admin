import type { NextPage, Metadata } from 'next';
import { cookies } from 'next/headers';

import { Package } from 'react-feather';

import type { IUser } from '@models/user';

import { userKey } from '@constants/cookies';

import { AsideLayout } from '@components/layout';
import { Title } from '@components/elements';

import { OrderList } from './components';

export const metadata: Metadata = {
  title: 'Encomendas'
};

const Orders: NextPage = () => {
  const user: IUser = JSON.parse(cookies().get(userKey)?.value as string);

  return (
    <AsideLayout>
      <Title
        icon={<Package />}
        title='Encomendas'
      />
      <OrderList userId={user.id} />
    </AsideLayout>
  );
};

export default Orders;