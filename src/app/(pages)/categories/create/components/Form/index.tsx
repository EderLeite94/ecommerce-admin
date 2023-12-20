'use client';

import type { FC } from 'react';

import { v4 } from 'uuid';

import { useForm, type SubmitHandler } from 'react-hook-form';

import { useCategory, useImageUpload } from '@hooks/index';

import type { ICategory, IUser } from '@models/index';

import { Field, FieldFile, SubmitButton, TextareaField } from '@components/elements';

import { categoryDefaultValues, resolver } from './utils';

interface FormProps {
  userId: IUser['id'];
}

const Form: FC<FormProps> = ({ userId }) => {
  const { control, register, handleSubmit, reset, formState: { errors } } = useForm<ICategory>({
    mode: 'onChange',
    defaultValues: categoryDefaultValues,
    resolver
  });

  const { handleCreateCategory, isLoading: isLoadingCategory } = useCategory();
  const { handleUpload, progress, isLoading: isLoadingImageUpload, imageURL } = useImageUpload();

  const onSubmit: SubmitHandler<Omit<ICategory, 'id'>> = async (categoryValues) => {
    await handleUpload(
      categoryValues.image[0] as unknown as File,
      `${userId}/category`,
      `${categoryValues.name}-${v4()}`
    );

    await handleCreateCategory(userId, {
      ...categoryValues,
      image: imageURL
    });

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
      <FieldFile
        label='Escolha uma foto:'
        name='image'
        progress={progress}
        isLoading={isLoadingImageUpload}
        error={errors.image?.message}
        register={register}
      />
      <SubmitButton
        title='Enviar'
        isDisabled={isLoadingCategory || isLoadingImageUpload}
        isLoading={isLoadingCategory}
      />
    </form>
  );
};

export default Form;