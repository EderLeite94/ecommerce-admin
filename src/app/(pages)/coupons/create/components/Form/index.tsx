'use client';

import type { FC } from 'react';

import { useForm, type SubmitHandler } from 'react-hook-form';

import { ICoupon, IUser } from '@models/index';

import { useCoupon } from '@hooks/index';

import { GridLayout } from '@components/layout';
import { Field, SubmitButton, TextareaField } from '@components/elements';

import { couponDefaultValues, schema } from './utils';

interface FormProps {
  userId: IUser['id'];
}

export const Form: FC<FormProps> = ({ userId }) => {
  const { control, handleSubmit, reset } = useForm<ICoupon>({
    mode: 'onChange',
    defaultValues: couponDefaultValues,
    resolver: schema
  });

  const { handleCreateCoupon, isLoading } = useCoupon();

  const onSubmit: SubmitHandler<ICoupon> = async (couponValues) => {
    await handleCreateCoupon(userId, couponValues);
    reset();
  };

  return (
    <form
      className='flex flex-col gap-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Field
        variant='faded'
        label='Nome'
        name='name'
        control={control}
      />
      <TextareaField
        variant='faded'
        label='Descrição'
        name='description'
        control={control}
      />
      <GridLayout cols='3'>
        <Field
          variant='faded'
          label='Código'
          name='code'
          control={control}
        />
        <Field
          type='number'
          variant='faded'
          label='Desconto (%)'
          placeholder='%'
          name='percentageValue'
          control={control}
        />
        <Field
          type='date'
          variant='faded'
          label='Data de validade'
          placeholder='dd/mm/aaaa'
          name='expirationDate'
          control={control}
        />
      </GridLayout>
      <SubmitButton
        title='Criar'
        isDisabled={isLoading}
        isLoading={isLoading}
      />
    </form>
  );
};