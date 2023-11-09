import type { FC } from 'react';

import { PlusCircle } from 'react-feather';

import { Title } from '@components/elements';

interface DescriptionProps {
  title: string;
}

export const Description: FC<DescriptionProps> = ({ title }) => {
  return (
    <>
      <Title
        icon={<PlusCircle />}
        title={title}
      />
      <p className='text-zinc-700 mb-2'>
        Aqui você tem o controle total para CRIAR os seus cupons que estarão disponíveis aos seus clientes. Esta é a sua ferramenta central para criar ofertas exclusivas, descontos imperdíveis e promoções especiais que vão encantar a clientela.
      </p>
    </>
  );
};