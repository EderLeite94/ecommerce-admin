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

import type { ICoupon, IUser } from '@models/index';

import { useCoupon } from '@hooks/index';

import { formatDate } from '@utils/date';

import { columns, type IRows } from './utils';

interface TableProps {
  userId: IUser['id'];
  coupons: ICoupon[];
}

const Table: FC<TableProps> = ({ userId, coupons }) => {
  const { handleDeleteCouponById, isLoading } = useCoupon();

  const rows: IRows[] = coupons.map(({ id, expirationDate, ...rest }) => ({
    expirationDate: formatDate(expirationDate),
    delete:
      <Button
        color='danger'
        onClick={() => handleDeleteCouponById(userId, id)}
        isDisabled={isLoading}
      >
        <Trash2 className='stroke-white w-4 h-auto' />
      </Button>,
    ...rest
  }));

  return (
    <TableContainer aria-label='Tabela de cupons'>
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
            key={`${item.code}-${item.name}`}
            className='text-zinc-900'
          >
            {(columnKey) =>
              <TableCell>
                {getKeyValue(item, columnKey)}
                {columnKey === 'percentageValue' && '%'}
              </TableCell>}
          </TableRow>
        }
      </TableBody>
    </TableContainer>
  );
};

export default Table;