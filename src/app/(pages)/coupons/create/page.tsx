import type { Metadata, NextPage } from 'next';
import { cookies } from 'next/headers';

import type { IUser } from '@models/index';

import { AsideLayout } from '@components/layout';

import { userKey } from '@constants/cookies';

import { Description, Form } from './components';

export const metadata: Metadata = {
  title: 'Criar cupom'
};

const CouponsCreate: NextPage = () => {
  const user: IUser = JSON.parse(cookies().get(userKey)?.value as string);

  return (
    <AsideLayout>
      <Description title={metadata.title as string} />
      <Form userId={user.id} />
    </AsideLayout>
  );
};

export default CouponsCreate;