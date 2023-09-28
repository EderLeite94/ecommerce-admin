'use client';

import { useState } from 'react';

import type { NextPage } from 'next';
import NextImage from 'next/image';
import NextLink from 'next/link';

import { Button, Link } from '@nextui-org/react';

import { useForm, type SubmitHandler } from 'react-hook-form';

import { Eye, EyeOff } from 'react-feather';

import { Field } from '@components/elements';

import { formatCNPJ } from '@utils/formatters';

import { signInDefaultValues, schema, type ISignIn } from './utils';

const Home: NextPage = () => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const { control, handleSubmit, setValue } = useForm<ISignIn>({
    mode: 'onChange',
    defaultValues: signInDefaultValues,
    resolver: schema
  });

  const handleToggleVisiblePassword = () => {
    setIsVisiblePassword(prevState => !prevState);
  };

  const onSubmit: SubmitHandler<ISignIn> = (signInValues) => {
    console.log(signInValues);
  };

  return (
    <div className='bg-zinc-900 flex flex-col items-center min-h-screen h-full p-10'>
      <NextImage
        src='/medias/logo-white.svg'
        alt='Sync'
        width="0"
        height="0"
        className="mb-6 w-36 h-auto"
        draggable='false'
      />
      <p className='text-zinc-50 text-center mb-4'>
        Insira as informações para acessar sua conta!
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center gap-2 max-w-sm w-full'
      >
        <Field
          type="text"
          label="CNPJ"
          name='cnpj'
          control={control}
          onChange={({ target: { value } }) => setValue('cnpj', formatCNPJ(value))}
        />
        <Field
          type={isVisiblePassword ? 'text' : 'password'}
          label="Senha"
          name='password'
          control={control}
          endContent={
            <button type='button' className="focus:outline-none" onClick={handleToggleVisiblePassword}>
              {isVisiblePassword
                ? <Eye className='stroke-zinc-900' />
                : <EyeOff className='stroke-zinc-900' />}
            </button>
          }
        />
        <Button
          type='submit'
          color="primary"
          className='uppercase font-semibold mt-8 py-unit-lg w-60'
        >
          Entrar
        </Button>
      </form>
      <Link
        href="/recovery-password"
        as={NextLink}
        size="sm"
        underline="always"
        className='mt-4'
      >
        Esqueci minha senha
      </Link>
    </div>
  );
};

export default Home;