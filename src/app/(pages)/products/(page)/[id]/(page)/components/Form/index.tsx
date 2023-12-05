/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useEffect, useState, type FC } from 'react';

import { useSearchParams, usePathname } from 'next/navigation';

import { useForm, useFieldArray, type SubmitHandler } from 'react-hook-form';

import { SelectItem, Button, Spinner } from '@nextui-org/react';

import { Plus, Minus } from 'react-feather';

import type { ICategory } from '@models/index';

import { baseURL } from '@constants/api';

import { useProduct, useImageUpload, useFetch } from '@hooks/index';

import { GridLayout } from '@components/layout';
import { Field, FieldFile, Fieldset, SelectField, SubmitButton, TextareaField } from '@components/elements';

import { colors } from '@mocks/colors';

import { formatDate } from '@utils/date';

import { resolver, massMeasurements, type TProducts } from './utils';

const Form: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<TProducts & { id: string }>();
  const [categories, setCategories] = useState<ICategory[]>();

  const pathname = usePathname();
  const { get } = useSearchParams();

  const userId = get('userId') as string;
  const productId = pathname.split('/')[2];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [product, categories] = await Promise.all([
          useFetch<{ body: TProducts & { id: string } }>(
            `${baseURL}/product/get-by-id/${userId}/${productId}`, 'GET'),
          useFetch<{ body: ICategory[] }>(
            `${baseURL}/category/get-all/${userId}?limit=100`, 'GET')
        ]);

        setProducts(product.data.body);
        setCategories(categories.data.body);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId, userId]);

  const { control, register, handleSubmit, setValue, formState: { errors } } = useForm<TProducts>({
    mode: 'onChange',
    resolver
  });

  useEffect(() => {
    if (products) {
      const fields: (keyof TProducts)[] = [
        'name',
        'description',
        'category',
        'installments',
        'images',
        'additionalInformation',
        'productOptions',
      ];

      fields.forEach((field) => setValue(field, products?.[field]));
    }
  }, [products, setValue]);

  const { fields: fieldProductOptions, append: appendSize, remove: removeSize } = useFieldArray({
    name: 'productOptions',
    control
  });
  const { fields: fieldImages, append: appendImage, remove: removeImage } = useFieldArray({
    name: 'images',
    control
  });

  const { handleUpdateProductById, isLoading: isLoadingUpdate } = useProduct();
  const { handleUpload, progress, isLoading: isLoadingImageUpload } = useImageUpload();

  const onSubmit: SubmitHandler<TProducts> = async (productsValues) => {
    const imagePromises = productsValues.images.map(({ url }) => {
      if (typeof url === 'string') return url;
      return handleUpload(
        url[0] as unknown as File,
        `${userId}/product`,
        `${productsValues.name}-${new Date().toDateString()}`
      );
    });

    const uploadedImages = await Promise.all(imagePromises);

    await handleUpdateProductById(userId, String(productId), {
      ...productsValues,
      images: uploadedImages.map((image) => ({ url: image }))
    });
  };

  if (isLoading) {
    return <div className='flex justify-center'>
      <Spinner size='lg' color='primary' />
    </div>;
  }

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
        {categories && (
          <SelectField
            variant='faded'
            label='Categorias'
            name='category'
            control={control}
            isDisabled={!categories.length}
            description={
              <span className='text-zinc-500'>Atual: {products?.category}</span>
            }
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
        )}
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
            description={
              <span className='text-zinc-500'>Atual: {products?.additionalInformation.massMeasurements}</span>
            }
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
                description={products?.productOptions?.[index]?.promotionalExpiryDate &&
                  <span className='text-zinc-500'>Atual: {formatDate(products.productOptions[index].promotionalExpiryDate)}</span>
                }
              />
            </GridLayout>
            <GridLayout cols='3'>
              <SelectField
                variant='faded'
                label='Cor'
                name={`productOptions.${index}.color`}
                control={control}
                description={products?.productOptions?.[index]?.color &&
                  <span className='text-zinc-500'>Atual: {products?.productOptions[index].color}</span>
                }
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
          onClick={() => appendSize({
            price: 0,
            promotionalPrice: 0,
            promotionalExpiryDate: new Date(),
            color: '',
            quantity: 0,
            size: '',
            bust: '',
            waist: '',
            hip: ''
          })}
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
        title='Atualizar'
        isDisabled={isLoadingUpdate}
        isLoading={isLoadingUpdate}
      />
    </form>
  );
};

export default Form;