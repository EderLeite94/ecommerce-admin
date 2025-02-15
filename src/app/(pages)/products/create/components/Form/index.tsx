'use client';

import type { FC } from 'react';

import { v4 } from 'uuid';

import { useForm, useFieldArray, type SubmitHandler } from 'react-hook-form';

import { SelectItem, Button } from '@nextui-org/react';

import { Plus, Minus } from 'react-feather';

import type { IUser, ICategory } from '@models/index';

import { useProduct, useImageUpload } from '@hooks/index';

import { GridLayout } from '@components/layout';
import { Field, FieldFile, Fieldset, SelectField, SubmitButton, TextareaField } from '@components/elements';

import { colors } from '@mocks/colors';

import { productDefaultValues, resolver, massMeasurements, type TProducts } from './utils';

interface FormProps {
  userId: IUser['id'];
  categories: ICategory[];
}

const Form: FC<FormProps> = ({ userId, categories }) => {
  const { control, register, handleSubmit, reset, formState: { errors } } = useForm<TProducts>({
    mode: 'onChange',
    defaultValues: productDefaultValues,
    resolver
  });

  const { fields: fieldProductOptions, append: appendSize, remove: removeSize } = useFieldArray({
    name: 'productOptions',
    control
  });

  const { fields: fieldImages, append: appendImage, remove: removeImage } = useFieldArray({
    name: 'images',
    control
  });

  const { handleCreateProduct, isLoading } = useProduct();
  const { handleUpload, progress, isLoading: isLoadingImageUpload } = useImageUpload();

  const onSubmit: SubmitHandler<TProducts> = async (productsValues) => {
    const imagePromises = productsValues.images.map(({ url }, index) => {
      return handleUpload(
        url[0] as unknown as File,
        `${userId}/product`,
        `${productsValues.name}-${v4()}-${index}`
      );
    });

    const uploadedImages = await Promise.all(imagePromises);

    await handleCreateProduct(userId, {
      ...productsValues,
      images: uploadedImages.map((image) => ({ url: image }))
    });

    reset();
  };

  return (
    <form
      className='flex flex-col gap-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Fieldset legend='Informações Básicas'>
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
        <SelectField
          variant='faded'
          label='Categorias'
          name='category'
          control={control}
          isDisabled={!categories.length}
          description={!categories.length && (
            <span className='text-danger-500'>Nenhuma categoria criada!</span>
          )}
        >
          {categories.map(({ name }) => (
            <SelectItem
              key={name}
              value={name}
              className='text-zinc-700'
            >
              {name}
            </SelectItem>
          ))}
        </SelectField>
        <Field
          type='number'
          variant='faded'
          label='Número de parcelas'
          placeholder='0'
          name='installments'
          control={control}
        />
      </Fieldset>
      <Fieldset legend='Peso/Dimensões'>
        <GridLayout>
          <Field
            type='number'
            variant='faded'
            label='Peso'
            placeholder='0'
            name='additionalInformation.weight'
            control={control}
          />
          <SelectField
            variant='faded'
            label='Medidas de massa'
            name='additionalInformation.massMeasurements'
            control={control}
          >
            {massMeasurements.map((massMeasurement) => (
              <SelectItem
                key={massMeasurement}
                value={massMeasurement}
                className='text-zinc-900'
              >
                {massMeasurement}
              </SelectItem>
            ))}
          </SelectField>
        </GridLayout>
        <Field
          variant='faded'
          label='Dimensões'
          name='additionalInformation.dimensions'
          control={control}
        />
      </Fieldset>
      <Fieldset legend='Informações adicionais'>
        {fieldProductOptions.map((field, index) => (
          <div
            key={field.id}
            className='flex flex-col gap-4'
          >
            <GridLayout cols='3'>
              <Field
                type='number'
                variant='faded'
                label='Preço'
                placeholder='0'
                name={`productOptions.${index}.price`}
                control={control}
              />
              <Field
                type='number'
                variant='faded'
                label='Preço promocional'
                placeholder='0'
                name={`productOptions.${index}.promotionalPrice`}
                control={control}
              />
              <Field
                type='date'
                variant='faded'
                label='Data de expiração preço promocional'
                placeholder='dd/mm/aaaa'
                name={`productOptions.${index}.promotionalExpiryDate`}
                control={control}
              />
            </GridLayout>
            <GridLayout cols='3'>
              <SelectField
                variant='faded'
                label='Cor'
                name={`productOptions.${index}.color`}
                control={control}
              >
                {colors.map(({ name, hex }) => (
                  <SelectItem
                    key={name}
                    value={name}
                    style={{ color: hex }}
                  >
                    {name}
                  </SelectItem>
                ))}
              </SelectField>
              <Field
                variant='faded'
                label='Quantidade'
                name={`productOptions.${index}.quantity`}
                placeholder='0'
                control={control}
              />
              <Field
                variant='faded'
                label='Tamanho'
                name={`productOptions.${index}.size`}
                control={control}
              />
            </GridLayout>
            <GridLayout cols='3'>
              <Field
                variant='faded'
                label='Busto'
                name={`productOptions.${index}.bust`}
                control={control}
              />
              <Field
                variant='faded'
                label='Cintura'
                name={`productOptions.${index}.waist`}
                control={control}
              />
              <Field
                variant='faded'
                label='Quadril'
                name={`productOptions.${index}.hip`}
                control={control}
              />
            </GridLayout>
            <Button
              type='button'
              color='danger'
              className='disabled:opacity-50'
              onClick={() => removeSize(index)}
              disabled={index === 0}
            >
              <Minus className='text-white' />
            </Button>
          </div>
        ))}
        <Button
          type='button'
          color='success'
          className='mt-2'
          onClick={() => appendSize(productDefaultValues.productOptions)}
        >
          <Plus className='text-white' />
        </Button>
      </Fieldset>
      <Fieldset legend='Imagens'>
        {fieldImages.map((field, index) => (
          <div
            key={field.id}
            className='flex items-center justify-between'
          >
            <FieldFile
              label='Escolha uma foto:'
              name={`images.${index}.url`}
              progress={progress}
              isLoading={isLoadingImageUpload}
              error={errors.images?.[index]?.url?.message as string}
              register={register}
            />
            <div className='flex items-center gap-4'>
              <Button
                type='button'
                color='danger'
                className='disabled:opacity-50'
                onClick={() => removeImage(index)}
                disabled={index === 0}
              >
                <Minus className='text-white' />
              </Button>
              <Button
                type='button'
                color='success'
                isDisabled={isLoadingImageUpload}
                onClick={() => appendImage({ url: '' })}
              >
                <Plus className='text-white' />
              </Button>
            </div>
          </div>
        ))}
      </Fieldset>
      <SubmitButton
        title='Criar'
        isDisabled={isLoading}
        isLoading={isLoading}
      />
    </form>
  );
};

export default Form;