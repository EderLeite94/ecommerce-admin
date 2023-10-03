'use client';

import type { NextPage } from 'next';

import { useForm, type SubmitHandler } from 'react-hook-form';

import { Lock } from 'react-feather';

import { AsideLayout } from '@components/layout';
import { Field, ForgotPassword, SubmitButton, Title } from '@components/elements';

import { passwordTips, changePasswordDefaultValues, schema, type IChangePassword } from './utils';

const AccountChangePassword: NextPage = () => {
  const { control, handleSubmit } = useForm<IChangePassword>({
    mode: 'onChange',
    defaultValues: changePasswordDefaultValues,
    resolver: schema
  });

  const onSubmit: SubmitHandler<IChangePassword> = (changePasswordValues) => {
    console.log(changePasswordValues);
  };

  return (
    <AsideLayout>
      <Title
        icon={<Lock />}
        title='Alterar senha'
      />
      <p className='text-zinc-700'>
        Sua segurança é importante para nós, e é por isso que oferecemos a você a opção de alterar sua senha a qualquer momento. Por favor, confira as dicas de segurança abaixo para criar uma nova senha segura.
      </p>
      <h2 className='text-zinc-900 font-semibold mt-2'>
        Dicas:
      </h2>
      <ul className='list-disc flex flex-col gap-1 ml-3 my-2'>
        {passwordTips.map((tip, index) => (
          <li
            key={`${index}-tip`}
            className='text-zinc-700 text-sm'
          >
            {tip}
          </li>
        ))}
      </ul>
      <form
        className='flex flex-col gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field
          type='password'
          variant='faded'
          label='Senha atual'
          name='password'
          control={control}
        />
        <Field
          type='password'
          variant='faded'
          label='Nova senha'
          name='newPassword'
          control={control}
        />
        <Field
          type='password'
          variant='faded'
          label='Confirme a nova senha'
          name='confirmNewPassword'
          control={control}
        />
        <SubmitButton title='Alterar' />
        <ForgotPassword className='mt-0 mx-auto' />
      </form>
    </AsideLayout >
  );
};

export default AccountChangePassword;