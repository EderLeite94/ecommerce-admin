import type { Metadata, NextPage } from 'next';

import { AsideNavigation } from '@components/modules';

export const metadata: Metadata = {
  title: 'Sync Admin | Dashboard'
};

const Dashboard: NextPage = () => {
  return (
    <div className='bg-zinc-50 min-h-screen h-full box-content'>
      <AsideNavigation />
    </div>
  );
};

export default Dashboard;