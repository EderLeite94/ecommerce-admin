'use client';

import { useState, type FC } from 'react';

import { useForm, type SubmitHandler } from 'react-hook-form';

import { Button } from '@nextui-org/react';

import { Eye, EyeOff } from 'react-feather';

import type { ISignIn } from '@models/index';

import { useAuth } from '@hooks/index';

import { Field } from '@components/elements';

import { formatCNPJ } from '@utils/formatters';

import { signInDefaultValues, resolver } from './utils';

export const Form: FC = () => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const { control, handleSubmit, setValue } = useForm<ISignIn>({
    mode: 'onChange',
    defaultValues: signInDefaultValues,
    resolver
  });

  const { handleSignIn, isLoading } = useAuth();

  const handleToggleVisiblePassword = () => setIsVisiblePassword(prevState => !prevState);

  const onSubmit: SubmitHandler<ISignIn> = (signInValues) => handleSignIn(signInValues);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col items-center gap-2 max-w-sm w-full'
    >
      <Field
        type='text'
        label='CNPJ'
        name='cnpj'
        control={control}
        onChange={({ target: { value } }) => setValue('cnpj', formatCNPJ(value))}
      />
      <Field
        type={isVisiblePassword ? 'text' : 'password'}
        label='Senha'
        name='password'
        control={control}
        endContent={
          <button
            type='button'
            onClick={handleToggleVisiblePassword}
          >
            {isVisiblePassword
              ? <Eye className='stroke-zinc-900' />
              : <EyeOff className='stroke-zinc-900' />
            }
          </button>
        }
      />
      <Button
        type='submit'
        color='primary'
        isDisabled={isLoading}
        isLoading={isLoading}
        className='uppercase font-semibold mt-8 py-unit-lg w-60'
      >
        Entrar
      </Button>
    </form>
  );
};