'use client';

import type { NextPage } from 'next';

import { Command } from 'react-feather';

import { AsideLayout } from '@components/layout';
import { Title } from '@components/elements';

const Dashboard: NextPage = () => {
  return (
    <AsideLayout>
      <Title
        icon={<Command />}
        title='Dashboard'
      />
    </AsideLayout>
  );
};

export default Dashboard;