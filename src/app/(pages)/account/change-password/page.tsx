import type { NextPage, Metadata } from 'next';
import { cookies } from 'next/headers';

import type { IUser } from '@models/index';

import { userKey } from '@constants/cookies';

import { AsideLayout } from '@components/layout';

import { Description, Form } from './components';

export const metadata: Metadata = {
  title: 'Alterar senha'
};

const AccountChangePassword: NextPage = () => {
  const user: IUser = JSON.parse(cookies().get(userKey)?.value as string);

  return (
    <AsideLayout>
      <Description title={metadata.title as string} />
      <Form userId={user.id} />
    </AsideLayout>
  );
};

export default AccountChangePassword;