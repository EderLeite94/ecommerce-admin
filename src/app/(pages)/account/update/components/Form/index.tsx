'use client';

import type { FC } from 'react';

import { useForm, type SubmitHandler } from 'react-hook-form';

import { SelectItem } from '@nextui-org/react';

import type { IAdmin } from '@models/index';

import { states } from '@mocks/index';

import { useAuth } from '@hooks/index';

import { GridLayout } from '@components/layout';
import { Field, Fieldset, SelectField, SubmitButton } from '@components/elements';

import { formatCNPJ, formatCPF, formatCEP } from '@utils/formatters';

import { getCompanyDefaultValues, resolver, type TCompany } from './utils';

interface FormProps {
  admin: IAdmin;
}

const Form: FC<FormProps> = ({ admin }) => {
  const { control, handleSubmit, setValue, } = useForm<TCompany>({
    mode: 'onChange',
    defaultValues: getCompanyDefaultValues(admin),
    resolver
  });

  const { handleUpdateAdminById, isLoading } = useAuth();

  const onSubmit: SubmitHandler<TCompany> = (companyValues) => {
    handleUpdateAdminById(admin.id, companyValues);
  };

  return (
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
          onChange={({ target: { value } }) => setValue('cep', formatCEP(value))}
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
      <SubmitButton
        title='Atualizar'
        isDisabled={isLoading}
        isLoading={isLoading}
      />
    </form>
  );
};

export default Form;