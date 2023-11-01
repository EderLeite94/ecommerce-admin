import type { FC } from 'react';

import { Lock } from 'react-feather';

import { Title } from '@components/elements';

import { passwordTips } from './utils';

interface DescriptionProps {
  title: string;
}

export const Description: FC<DescriptionProps> = ({ title }) => {
  return (
    <>
      <Title
        icon={<Lock />}
        title={title}
      />
      <p className='text-zinc-700'>
        Sua segurança é importante para nós, e é por isso que oferecemos a você a opção de alterar sua senha a qualquer momento. Por favor, confira as dicas de segurança abaixo para criar uma nova senha segura.
      </p>
      <h2 className='text-zinc-900 font-semibold mt-2'>
        Dicas:
      </h2>
      <ul className='list-disc flex flex-col gap-1 ml-3 my-2'>
        {passwordTips.map((tip, index) => (
          <li
            key={`${index}-tip`}
            className='text-zinc-700 text-sm'
          >
            {tip}
          </li>
        ))}
      </ul>
    </>
  );
}; 