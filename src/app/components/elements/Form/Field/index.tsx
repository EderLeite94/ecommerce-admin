'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from 'react';

import { Controller, type Control } from 'react-hook-form';

import { Input, type InputProps } from '@nextui-org/react';

import { ErrorMessage } from '@components/elements';

interface FieldProps extends InputProps {
  control: Control<any, any>;
}

export const Field: FC<FieldProps> = ({
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
          <Input
            {...fields}
            {...props}
            variant={variant}
            errorMessage={error && <ErrorMessage errorMessage={error.message as string} />}
            className='text-zinc-900'
          />
        )
      }
    />
  );
};