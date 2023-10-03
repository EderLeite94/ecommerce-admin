'use client';

import type { NextPage } from 'next';
import NextImage from 'next/image';
import { useRouter } from 'next/navigation';

import { Button, ButtonGroup } from '@nextui-org/react';

import { useForm, type SubmitHandler } from 'react-hook-form';

import { Field, SubmitButton } from '@components/elements';

import { recoveryPasswordDefaultValues, schema, type IRecoveryPassword } from './utils';

const RecoveryPassword: NextPage = () => {
  const { back } = useRouter();

  const { control, handleSubmit } = useForm<IRecoveryPassword>({
    mode: 'onChange',
    defaultValues: recoveryPasswordDefaultValues,
    resolver: schema
  });

  const onSubmit: SubmitHandler<IRecoveryPassword> = (recoveryPasswordValues) => {
    console.log(recoveryPasswordValues);
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
      <h1 className='text-zinc-50 text-lg font-semibold mb-4'>
        Recuperação de senha
      </h1>
      <p className='text-zinc-50 text-center mb-4'>
        Informe seu e-mail para que as instruções de recuperar a <br /> senha sejam enviadas!
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center gap-2 max-w-sm w-full'
      >
        <Field
          type="email"
          label="E-mail"
          name='email'
          control={control}
        />
        <ButtonGroup className='gap-2 mt-8'>
          <Button
            color="primary"
            className='uppercase font-semibold py-unit-lg w-32'
            onClick={back}
          >
            Voltar
          </Button>
          <SubmitButton
            title='Enviar'
            className='mt-0 w-32'
          />
        </ButtonGroup>
      </form>
    </div>
  );
};

export default RecoveryPassword;