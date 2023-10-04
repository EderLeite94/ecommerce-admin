import type { ReactNode } from 'react';

import { Command, Eye, Lock, Package, Percent, PlusCircle, ShoppingBag, UploadCloud, User } from 'react-feather';

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
    title: 'Cupons',
    icon: <Percent className='w-5' />,
    items: [
      {
        icon: <Eye className='w-4' />,
        label: 'Visualizar todos',
        path: '/coupons'
      },
      {
        icon: <PlusCircle className='w-4' />,
        label: 'Criar',
        path: '/coupons/add'
      }
    ]
  },
  {
    title: 'Produtos',
    icon: <ShoppingBag className='w-5' />,
    items: [
      {
        icon: <Eye className='w-4' />,
        label: 'Visualizar todos',
        path: '/products'
      },
      {
        icon: <PlusCircle className='w-4' />,
        label: 'Criar',
        path: '/products/add'
      }
    ]
  }
];

export const linkItems: NavigationItems[] = [
  {
    icon: <Package className='w-5' />,
    label: 'Encomendas',
    path: '/orders'
  },
  {
    icon: <Command className='w-5' />,
    label: 'Dashboard',
    path: '/dashboard'
  }
];