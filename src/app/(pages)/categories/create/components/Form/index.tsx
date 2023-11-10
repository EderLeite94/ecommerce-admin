'use client';

import type { FC } from 'react';

import { useForm, type SubmitHandler } from 'react-hook-form';

import { useCategory } from '@hooks/index';

import type { IUser } from '@models/index';

import { Field, SubmitButton, TextareaField } from '@components/elements';

import { categoryDefaultValues, resolver, type TCategory } from './utils';

interface FormProps {
  userId: IUser['id'];
}

const Form: FC<FormProps> = ({ userId }) => {
  const { control, handleSubmit, reset } = useForm<TCategory>({
    mode: 'onChange',
    defaultValues: categoryDefaultValues,
    resolver
  });

  const { handleCreateCategory, isLoading } = useCategory();

  const onSubmit: SubmitHandler<TCategory> = async (categoryValues) => {
    await handleCreateCategory(userId, categoryValues);
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
      <SubmitButton
        title='Enviar'
        isDisabled={isLoading}
        isLoading={isLoading}
      />
    </form>
  );
};

export default Form;