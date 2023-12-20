'use client';

import type { FC } from 'react';

import { useForm, type SubmitHandler } from 'react-hook-form';

import type { IUser } from '@models/user';

import { useAuth } from '@hooks/index';

import { Field, SubmitButton } from '@components/elements';

import { changePasswordDefaultValues, resolver, type TChangePassword } from './utils';

interface FormProps {
  userId: IUser['id'];
}

export const Form: FC<FormProps> = ({ userId }) => {
  const { control, handleSubmit, reset } = useForm<TChangePassword>({
    mode: 'onChange',
    defaultValues: changePasswordDefaultValues,
    resolver
  });

  const { handleUpdatePasswordById, isLoading } = useAuth();

  const onSubmit: SubmitHandler<TChangePassword> = async (changePasswordValues) => {
    await handleUpdatePasswordById(userId, changePasswordValues);
    reset();
  };

  return (
    <form
      className='flex flex-col gap-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Field
        type='text'
        variant='faded'
        label='Senha atual'
        name='password'
        control={control}
      />
      <Field
        type='text'
        variant='faded'
        label='Nova senha'
        name='newPassword'
        control={control}
      />
      <Field
        type='text'
        variant='faded'
        label='Confirme a nova senha'
        name='checkPassword'
        control={control}
      />
      <SubmitButton
        title='Alterar'
        isDisabled={isLoading}
        isLoading={isLoading}
      />
    </form>
  );
}; 