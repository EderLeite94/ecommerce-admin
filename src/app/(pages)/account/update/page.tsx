import type { NextPage, Metadata } from 'next';
import { cookies } from 'next/headers';

import { UploadCloud } from 'react-feather';

import type { IAdmin } from '@models/index';

import { userKey } from '@constants/cookies';

import { AsideLayout } from '@components/layout';
import { Title } from '@components/elements';

import { Form } from './components';

export const metadata: Metadata = {
  title: 'Atualizar dados'
};

const AccountUpdate: NextPage = () => {
  const admin: IAdmin = JSON.parse(cookies().get(userKey)?.value as string);

  return (
    <AsideLayout>
      <Title
        icon={<UploadCloud />}
        title={metadata.title as string}
      />
      <Form admin={admin} />
    </AsideLayout>
  );
};

export default AccountUpdate;