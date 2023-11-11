import type { ICategory } from '@models/index';

interface IColumns {
  key: string;
  label: string;
}

export interface IRows extends ICategory {
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
    key: 'delete',
    label: 'EXCLUIR'
  }
];