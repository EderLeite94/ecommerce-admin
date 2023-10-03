'use client';

import type { NextPage } from 'next';

import { useForm, type SubmitHandler } from 'react-hook-form';

import { SelectItem } from '@nextui-org/react';

import { UploadCloud } from 'react-feather';

import { states } from '@mocks/index';

import { AsideLayout, HalfToHalf } from '@components/layout';
import { Field, Fieldset, SelectField, SubmitButton, Title } from '@components/elements';

import { formatCNPJ, formatCPF } from '@utils/formatters';

import { companyDefaultValues, schema, type ICompany } from './utils';

const AccountUpdate: NextPage = () => {
  const { control, handleSubmit, setValue } = useForm<ICompany>({
    mode: 'onChange',
    defaultValues: companyDefaultValues,
    resolver: schema
  });

  const onSubmit: SubmitHandler<ICompany> = (companyValues) => {
    console.log(companyValues);
  };

  return (
    <AsideLayout>
      <Title
        icon={<UploadCloud />}
        title='Atualizar dados'
      />
      <form
        className='flex flex-col gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Fieldset legend='Empresa:'>
          <Field
            variant='faded'
            label='CNPJ'
            name='cnpj'
            control={control}
            onChange={({ target: { value } }) => setValue('cnpj', formatCNPJ(value))}
          />
          <HalfToHalf>
            <Field
              variant='faded'
              label='Razão social'
              name='corporateReason'
              control={control}
            />
            <Field
              variant='faded'
              label='Nome fantasia'
              name='fantasyName'
              control={control}
            />
          </HalfToHalf>
          <Field
            variant='faded'
            label='E-mail'
            name='email'
            control={control}
          />
        </Fieldset>
        <Fieldset legend='Proprietário(a):'>
          <HalfToHalf>
            <Field
              variant='faded'
              label='Nome'
              name='name'
              control={control}
            />
            <Field
              variant='faded'
              label='Sobrenome'
              name='surname'
              control={control}
            />
          </HalfToHalf>
          <Field
            variant='faded'
            label='CPF'
            name='cpf'
            control={control}
            onChange={({ target: { value } }) => setValue('cpf', formatCPF(value))}
          />
        </Fieldset>
        <Fieldset legend='Localização:'>
          <Field
            variant='faded'
            label='CEP'
            name='cep'
            control={control}
          />
          <Field
            variant='faded'
            label='Endereço'
            name='street'
            control={control}
          />
          <HalfToHalf>
            <Field
              variant='faded'
              label='Bairro'
              name='district'
              control={control}
            />
            <Field
              variant='faded'
              label='Número'
              name='number'
              control={control}
            />
          </HalfToHalf>
        </Fieldset>
        <HalfToHalf>
          <Field
            variant='faded'
            label='Cidade'
            name='city'
            control={control}
          />
          <SelectField
            variant='faded'
            label='Estado'
            name='state'
            control={control}
          >
            {states.map((state, index) => (
              <SelectItem
                key={`${index}-${state}`}
                value={state}
                className='text-zinc-900'
              >
                {state}
              </SelectItem>
            ))}
          </SelectField>
        </HalfToHalf>
        <SubmitButton title='Atualizar' />
      </form>
    </AsideLayout>
  );
};

export default AccountUpdate;