import type { ICategory } from '@models/index';

interface IColumns {
  key: string;
  label: string;
}

export interface IRows extends Omit<ICategory, 'id'> {
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