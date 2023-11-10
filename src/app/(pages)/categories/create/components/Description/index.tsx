import type { FC } from 'react';

import { PlusCircle } from 'react-feather';

import { Title } from '@components/elements';

interface DescriptionProps {
  title: string;
}

const Description: FC<DescriptionProps> = ({ title }) => {
  return (
    <>
      <Title
        icon={<PlusCircle />}
        title={title}
      />
      <p className='text-zinc-700 mb-2'>
        Aqui você tem o controle total para CRIAR as suas categorias que estarão disponíveis aos seus clientes. Esta é a sua ferramenta central para criar divisões entre seus produtos.
      </p>
    </>
  );
};

export default Description;