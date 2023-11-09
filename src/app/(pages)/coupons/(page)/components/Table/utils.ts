import type { ICoupon } from '@models/coupon';

interface IColumns {
  key: string;
  label: string;
}

export interface IRows extends ICoupon {
  delete: JSX.Element;
}

export const columns: IColumns[] = [
  {
    key: 'name',
    label: 'NOME'
  },
  {
    key: 'description',
    label: 'DESCRIÇÃO'
  },
  {
    key: 'code',
    label: 'CÓDIGO'
  },
  {
    key: 'percentageValue',
    label: 'VALOR'
  },
  {
    key: 'expirationDate',
    label: 'EXPIRAÇÃO'
  },
  {
    key: 'delete',
    label: 'EXCLUIR'
  }
];