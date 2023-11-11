'use client';

import type { FC } from 'react';

import {
  Table as TableContainer,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button
} from '@nextui-org/react';

import { Trash2 } from 'react-feather';

import type { ICategory, IUser } from '@models/index';

import { useCategory } from '@hooks/index';

import { columns, type IRows } from './utils';

interface TableProps {
  userId: IUser['id'];
  categories: ICategory[];
}

const Table: FC<TableProps> = ({ userId, categories }) => {
  const { handleDeleteCategoryById, isLoading } = useCategory();

  const rows: IRows[] = categories.map(({ id, ...props }) => ({
    delete:
      <Button
        color='danger'
        onClick={() => handleDeleteCategoryById(userId, id)}
        isDisabled={isLoading}
      >
        <Trash2 className='stroke-white w-4 h-auto' />
      </Button>,
    ...props
  }));

  return (
    <TableContainer aria-label='Tabela de categorias'>
      <TableHeader columns={columns}>
        {({ key, label }) =>
          <TableColumn
            key={key}
            className='bg-zinc-900'
          >
            {label}
          </TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) =>
          <TableRow
            key={`${item.description}-${item.name}`}
            className='text-zinc-900'
          >
            {(columnKey) =>
              <TableCell>
                {getKeyValue(item, columnKey)}
              </TableCell>}
          </TableRow>
        }
      </TableBody>
    </TableContainer>
  );
};

export default Table;