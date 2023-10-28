'use client';

import type { NextPage } from 'next';

import { useForm, useFieldArray, type SubmitHandler } from 'react-hook-form';

import { SelectItem, Button } from '@nextui-org/react';

import { PlusCircle, Plus, Minus } from 'react-feather';

import { AsideLayout, GridLayout } from '@components/layout';
import { Field, Fieldset, SelectField, SubmitButton, Title, TextareaField } from '@components/elements';

import { colors } from '@mocks/colors';

import { productDefaultValues, schemaResolver, massMeasurements, type TProducts} from './utils';

const ProductsAdd: NextPage = () => {
  const { control, handleSubmit } = useForm<TProducts>({
    mode: 'onChange',
    defaultValues: productDefaultValues,
    resolver: schemaResolver
  });

  const { fields: fieldColors, append: appendColor, remove: removeColor } = useFieldArray({
    name: 'colors',
    control
  });

  const { fields: fieldSizes, append: appendSize, remove: removeSize } = useFieldArray({
    name: 'sizes',
    control
  });

  const onSubmit: SubmitHandler<TProducts> = (productsValues) => {
    console.log(productsValues);
  };

  return (
    <AsideLayout>
      <Title
        icon={<PlusCircle />}
        title='Criar produto'
      />
      <p className='text-zinc-700 mb-2'>
        Aqui você tem o controle total para criar e gerenciar os seus cupons que estarão disponíveis aos seus clientes. Esta é a sua ferramenta central para criar ofertas exclusivas, descontos imperdíveis e promoções especiais que vão encantar a clientela.
      </p>
      <form
        className='flex flex-col gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Fieldset legend='Básicas'>
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
          <Field
            variant='faded'
            label='Categoria'
            name='category'
            control={control}
          />
          {fieldColors.map((field, index) => (
            <div 
              key={field.id}
              className='flex items-start gap-4'
            >
              <SelectField 
                variant='faded'
                label='Cor'
                name={`colors.${index}.name`}
                control={control}
              >
                {colors.map(({name, hex}) => (
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
                type='number'
                variant='faded'
                label='Quantidade'
                placeholder='0'
                name={`colors.${index}.quantity`}
                control={control}
              />
              <Button 
                type='button'
                color='danger' 
                className='disabled:opacity-50 w-12 h-14'
                onClick={() => removeColor(index)} 
                disabled={index === 0}
              >
                <Minus className='text-white' />
              </Button>
            </div>
          ))}
          <Button type='button' color='success' className='mt-2 w-full' onClick={() => appendColor({
            name: '',
            quantity: 0
          })}>
            <Plus className='text-white' />
          </Button>
        </Fieldset>
        <Fieldset legend='Preço'>
          <GridLayout cols='3'>
            <Field
              type='number'
              variant='faded'
              label='Preço'
              placeholder='0'
              name='price'
              control={control}
            />
            <Field
              type='number'
              variant='faded'
              label='Desconto (%)'
              placeholder='%'
              name='discountPercentage'
              control={control}
            />
            <Field
              type='number'
              variant='faded'
              label='Número de parcelas'
              placeholder='0'
              name='installments'
              control={control}
            />
          </GridLayout>
        </Fieldset>
        <Fieldset legend='Informações adicionais'>
          <GridLayout>
            <Field
              type='number'
              variant='faded'
              label='Peso'
              placeholder='0'
              name='weight'
              control={control}
            />
            <SelectField
              variant='faded'
              label='Medidas de massa'
              name='massMeasurements'
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
            name='dimensions'
            control={control}
          />
          {fieldSizes.map((field, index) => (
            <div 
              key={field.id}
              className='flex items-start gap-4'
            >
              <Field
                variant='faded'
                label='Tamanho'
                name={`sizes.${index}.size`}
                control={control}
              />
              <Field
                variant='faded'
                label='Busto'
                name={`sizes.${index}.bust`}
                control={control}
              />
              <Field
                variant='faded'
                label='Cintura'
                name={`sizes.${index}.waist`}
                control={control}
              />
              <Field
                variant='faded'
                label='Quadril'
                name={`sizes.${index}.hip`}
                control={control}
              />
              <Button 
                type='button'
                color='danger' 
                className='disabled:opacity-50 w-12 h-14'
                onClick={() => removeSize(index)} 
                disabled={index === 0}
              >
                <Minus className='text-white' />
              </Button>
            </div>
          ))}
          <Button type='button' color='success' className='mt-2 w-full' onClick={() => appendSize({
            size: '',
            bust: '',
            waist: '',
            hip: ''
          })}
          >
            <Plus className='text-white' />
          </Button>
        </Fieldset>
        <SubmitButton title='Criar' />
      </form>
    </AsideLayout>
  );
};

export default ProductsAdd;