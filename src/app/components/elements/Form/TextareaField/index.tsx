'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from 'react';

import { Controller, type Control } from 'react-hook-form';

import { Textarea, type TextAreaProps } from '@nextui-org/react';

import { ErrorMessage } from '@components/elements';

interface TextAreaFieldProps extends TextAreaProps {
  control: Control<any, any>;
}

const TextareaField: FC<TextAreaFieldProps> = ({
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
          <Textarea
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

export default TextareaField;