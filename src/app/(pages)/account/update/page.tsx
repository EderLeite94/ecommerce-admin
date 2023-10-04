'use client';

import type { NextPage } from 'next';

import { useForm, type SubmitHandler } from 'react-hook-form';

import { SelectItem } from '@nextui-org/react';

import { UploadCloud } from 'react-feather';

import { states } from '@mocks/index';

import { AsideLayout, GridLayout } from '@components/layout';
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
          <GridLayout>
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
          </GridLayout>
          <Field
            variant='faded'
            label='E-mail'
            name='email'
            control={control}
          />
        </Fieldset>
        <Fieldset legend='Proprietário(a):'>
          <GridLayout>
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
          </GridLayout>
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
          <GridLayout>
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
          </GridLayout>
        </Fieldset>
        <GridLayout>
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
        </GridLayout>
        <SubmitButton title='Atualizar' />
      </form>
    </AsideLayout>
  );
};

export default AccountUpdate;