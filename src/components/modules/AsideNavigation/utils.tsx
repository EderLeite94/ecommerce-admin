import type { ReactNode } from 'react';

import { Command, Eye, Lock, Percent, PlusCircle, ShoppingBag, UploadCloud, User } from 'react-feather';

interface AccordionItems {
  title: string;
  icon: ReactNode;
  items: NavigationItems[];
}

interface NavigationItems {
  icon: ReactNode;
  label: string;
  path: string;
}

export const accordionItems: AccordionItems[] = [
  {
    title: 'Conta',
    icon: <User className='w-5' />,
    items: [
      {
        icon: <UploadCloud className='w-4' />,
        label: 'Atualizar dados',
        path: '/account/update'
      },
      {
        icon: <Lock className='w-4' />,
        label: 'Alterar senha',
        path: '/account/change-password'
      }
    ]
  },
  {
    title: 'Produtos',
    icon: <ShoppingBag className='w-5' />,
    items: [
      {
        icon: <PlusCircle className='w-4' />,
        label: 'Adicionar',
        path: '/products/add'
      },
      {
        icon: <Eye className='w-4' />,
        label: 'Visualizar todos',
        path: '/products/view-all'
      },
      {
        icon: <Percent className='w-4' />,
        label: 'Cupons',
        path: '/products/coupons'
      }
    ]
  }
];

export const linkItems: NavigationItems[] = [
  {
    icon: <Command className='w-5' />,
    label: 'Dashboard',
    path: '/dashboard'
  }
];