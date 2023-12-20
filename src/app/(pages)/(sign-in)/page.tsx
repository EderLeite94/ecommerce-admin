import type { NextPage, Metadata } from 'next';

import { Form, Header } from './components';

import { metadatas } from './utils';

export const metadata: Metadata = metadatas;

const Home: NextPage = () => {
  return (
    <div className='bg-zinc-900 flex flex-col items-center min-h-screen h-full p-10'>
      <Header />
      <Form />
    </div>
  );
};

export default Home;