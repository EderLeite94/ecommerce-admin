'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from 'react';

import { Controller, type Control } from 'react-hook-form';

import { Select, type SelectProps } from '@nextui-org/react';

import { ErrorMessage } from '@components/elements';

interface SelectFieldProps extends SelectProps {
  control: Control<any, any>;
}

const SelectField: FC<SelectFieldProps> = ({
  children,
  control,
  name,
  variant,
  ...props
}) => {
  return (
    <Controller
      name={name as string}
      control={control}
      defaultValue=''
      render={
        ({
          field: { ...fields },
          fieldState: { error }
        }) => (
          <Select
            {...fields}
            {...props}
            variant={variant}
            errorMessage={error && <ErrorMessage errorMessage={error.message as string} />}
            className='text-zinc-900'
          >
            {children}
          </Select>
        )
      }
    />
  );
};

export default SelectField;