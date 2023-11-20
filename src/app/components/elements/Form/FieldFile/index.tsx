'use client';

import type { FC } from 'react';

import { type UseFormRegister } from 'react-hook-form';

import { CircularProgress } from '@nextui-org/react';

import { ErrorMessage } from '@components/elements';

interface FieldFileProps {
  name: string;
  label: string;
  progress: number;
  isLoading: boolean;
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
}

const FieldFile: FC<FieldFileProps> = ({ name, label, progress, isLoading, error, register }) => {
  return (
    <>
      <label
        htmlFor={name}
        className='bg-zinc-900 text-white rounded p-1'
      >
        {label}
      </label>
      <input
        id={name}
        type='file'
        {...register(name)}
        className='hidden'
      />
      {!!isLoading && (
        <div className='flex items-center justify-center gap-2'>
          <CircularProgress
            aria-label='Carregando imagem...'
            color='success'
            size='lg'
            showValueLabel
            value={progress}
            className='text-success'
          />
          <span className='text-success text-center text-xs'>
            Carregando imagem...
          </span>
        </div>
      )}
      {error && <ErrorMessage errorMessage={error} />}
    </>
  );
};

export default FieldFile;