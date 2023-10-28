'use client';

import type { NextPage } from 'next';

import { useForm, type SubmitHandler } from 'react-hook-form';

import { Percent } from 'react-feather';

import { ICoupon } from '@models/index';

import { AsideLayout, GridLayout } from '@components/layout';
import { Field, SubmitButton, TextareaField, Title } from '@components/elements';

import { couponDefaultValues, schema } from './utils';

const CouponsCreate: NextPage = () => {
  const { control, handleSubmit } = useForm<ICoupon>({
    mode: 'onChange',
    defaultValues: couponDefaultValues,
    resolver: schema
  });

  const onSubmit: SubmitHandler<ICoupon> = (changePasswordValues) => {
    console.log(changePasswordValues);
  };

  return (
    <AsideLayout>
      <Title
        icon={<Percent />}
        title='Criar cupom'
      />
      <p className='text-zinc-700 mb-2'>
        Aqui você tem o controle total para criar e gerenciar os seus cupons que estarão disponíveis aos seus clientes. Esta é a sua ferramenta central para criar ofertas exclusivas, descontos imperdíveis e promoções especiais que vão encantar a clientela.
      </p>
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
        <SubmitButton title='Criar' />
      </form>
    </AsideLayout>
  );
};

export default CouponsCreate;