import type { NextPage, Metadata } from 'next';

import { ForgotPassword } from '@components/elements';

import { Form, Header } from './components';

import { metadatas } from './utils';

export const metadata: Metadata = metadatas;

const Home: NextPage = () => {
  return (
    <div className='bg-zinc-900 flex flex-col items-center min-h-screen h-full p-10'>
      <Header />
      <Form />
      <ForgotPassword />
    </div>
  );
};

export default Home;