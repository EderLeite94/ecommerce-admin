'use client';

import { useEffect, useState, type FC } from 'react';

import NextImage from 'next/image';

import { ArrowLeft, ArrowRight, ArrowDown, ArrowUp, RefreshCw } from 'react-feather';

import { Button, Input, Select, SelectItem, Spinner } from '@nextui-org/react';

import useOrder from '@hooks/useOrder';

import { status } from './utils';
import { formatCurrencyBRL } from '@utils/formatters/currency';
import { formatDate } from '@utils/date';
import { cn } from '@utils/cn';

interface OrderListProps {
  userId: string;
}

const OrderList: FC<OrderListProps> = ({ userId }) => {
  const { handleGetAllOrders, handleCancelPurchase, handleSendTrackingCode, orders, isLoading } = useOrder();

  const [trackingNumber, setTrackingNumber] = useState({
    id: '',
    trackingCode: ''
  });

  const [showAddressId, setShowAddressId] = useState('');

  const initialState: {
    page: number,
    limit: number,
    sortByDate: 'asc' | 'desc',
    status?: string
  } = {
    limit: 10,
    page: 1,
    sortByDate: 'desc',
    status: ''
  };

  const [params, setParams] = useState<{
    page: number,
    limit: number,
    sortByDate: 'asc' | 'desc',
    status?: string
  }>(initialState);

  const linkBaseStyles: string = 'bg-zinc-900 text-white uppercase text-sm rounded flex items-center justify-between w-28 p-2';
  const iconBaseStyles: string = 'w-4 h-auto';

  useEffect(() => {
    (async () => await handleGetAllOrders(userId, params))();
  }, [userId, handleGetAllOrders, params]);

  return (
    <div>
      <div className='flex justify-between gap-4 mb-4'>
        <Button
          isDisabled={params?.page === 1}
          className={linkBaseStyles}
          onClick={() => setParams({ ...params, page: Number(params?.page) - 1 })}
        >
          <ArrowLeft className={iconBaseStyles} /> Anterior
        </Button>
        <Button
          className={linkBaseStyles}
          onClick={() => setParams({ ...params, page: Number(params?.page) + 1 })}
        >
          Próximo <ArrowRight className={iconBaseStyles} />
        </Button>
      </div>
      <div className='flex justify-between'>
        <div className='flex items-center gap-4'>
          <Button
            className={linkBaseStyles}
            onClick={() => setParams({ ...params, sortByDate: params.sortByDate === 'asc' ? 'desc' : 'asc' })}
          >
            Data {params.sortByDate === 'asc' ? <ArrowDown className={iconBaseStyles} /> : <ArrowUp className={iconBaseStyles} />}
          </Button>
          <Button
            className={linkBaseStyles}
            onClick={() => setParams(initialState)}
          >
            Resetar <RefreshCw className={iconBaseStyles} />
          </Button>
        </div>
        <Select
          variant='faded'
          size='sm'
          label='Status'
          placeholder='Selecione algum status...'
          className='text-zinc-700 max-w-xs'
          onChange={({ target }) => setParams({ ...params, status: target.value })}
        >
          {status.map((status) => (
            <SelectItem
              key={status}
              value={status}
              className='text-zinc-700'
            >
              {status}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className='max-w-7xl w-full mx-auto mt-4'>
        {!isLoading ? (
          <div className='flex flex-col items-center gap-4'>
            {orders?.purchasedProducts.map((product, index) => (
              <div
                key={`purchased-products-${index}`}
                className='bg-zinc-50 flex flex-col rounded-md shadow-md p-4 max-w-3xl w-full'
              >
                <div className='flex flex-col'>
                  <Button
                    className='bg-blue-500 rounded-md shadow-md text-white text-center text-sm font-semibold mb-2'
                    onClick={() => {
                      if (product.infoBuyer.id === showAddressId) return setShowAddressId('');
                      setShowAddressId(product.infoBuyer.id);
                    }}
                  >
                    Ver endereços
                  </Button>
                  {showAddressId === product.infoBuyer.id && (
                    <div className='text-zinc-700 text-xs flex justify-around my-2'>
                      <div>
                        <p className='text-zinc-900 font-bold mt-1'>FATURAMENTO:</p>
                        <p><b>Nome:</b> {product.infoBuyer.user.info.name} {product.infoBuyer.user.info.surname}</p>
                        <p><b>Contato:</b> {product.infoBuyer.user.info.phoneNumber}</p>
                        <p><b>Rua:</b> {product.infoBuyer.user.address.street}</p>
                        <p><b>Número:</b> {product.infoBuyer.user.address.number}</p>
                        <p><b>Bairro:</b> {product.infoBuyer.user.address.district}</p>
                        <p><b>Cidade:</b> {product.infoBuyer.user.address.city}</p>
                        <p><b>Estado:</b> {product.infoBuyer.user.address.state}</p>
                        <p><b>CEP:</b> {product.infoBuyer.user.address.cep}</p>
                      </div>
                      <div>
                        <p className='text-zinc-900 font-bold mt-1'>ENTREGA:</p>
                        <p><b>Nome:</b> {product.infoBuyer.user.info.name} {product.infoBuyer.user.info.surname}</p>
                        <p><b>Contato:</b> {product.infoBuyer.user.info.phoneNumber}</p>
                        <p><b>Rua:</b> {product.infoBuyer.user.deliveryAddress.street}</p>
                        <p><b>Número:</b> {product.infoBuyer.user.deliveryAddress.number}</p>
                        <p><b>Bairro:</b> {product.infoBuyer.user.deliveryAddress.district}</p>
                        <p><b>Cidade:</b> {product.infoBuyer.user.deliveryAddress.city}</p>
                        <p><b>Estado:</b> {product.infoBuyer.user.deliveryAddress.state}</p>
                        <p><b>CEP:</b> {product.infoBuyer.user.deliveryAddress.cep}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className='flex items-center gap-4 mb-4'>
                  <Input
                    variant='faded'
                    label='Código de rastreio'
                    placeholder='Digite o código aqui...'
                    onChange={(event) => setTrackingNumber({
                      trackingCode: event.target.value,
                      id: product.infoBuyer.id
                    })}
                    className='text-zinc-700'
                    description={product.infoBuyer.tracking_code && (
                      <span className='text-zinc-700'>
                        <b>Atual:</b> {isLoading ? 'Carregando...' : product.infoBuyer.tracking_code}
                      </span>
                    )}
                  />
                  <Button
                    className='bg-blue-500 rounded-md shadow-md text-white text-center text-sm font-semibold w-56 mb-2'
                    onClick={async () => {
                      await Promise.all([
                        handleSendTrackingCode(trackingNumber.trackingCode, userId, product.infoBuyer.id),
                        handleGetAllOrders(userId, params)
                      ]);
                    }}
                    isDisabled={
                      trackingNumber.id === product.infoBuyer.id && isLoading ||
                      trackingNumber.id !== product.infoBuyer.id ||
                      product.status !== 'Aprovado'
                    }
                  >
                    Enviar
                  </Button>
                  {product.status === 'Pendente' && (
                    <Button
                      className='bg-danger rounded-md shadow-md text-white text-center text-sm font-semibold w-56 mb-2'
                      onClick={() => handleCancelPurchase(userId, product.infoBuyer.id, product.infoBuyer)}
                      isDisabled={isLoading}
                    >
                      Cancelar compra
                    </Button>
                  )}
                </div>
                <p className='flex flex-wrap justify-between text-zinc-700 text-sm font-semibold'>
                  <span className='text-yellow-700'>
                    #{product.infoBuyer.paymentID} ({formatDate(product.infoBuyer.createdAt)})
                  </span>
                  <span
                    className={
                      cn(
                        'text-xs',
                        product.status === 'Pendente' && 'text-warning',
                        product.status === 'Aprovado' && 'text-success',
                        product.status === 'Rejeitado' && 'text-danger',
                        product.status === 'Cancelado' && 'text-danger-500',
                        product.status === 'Em processo' && 'text-blue-500',
                        product.status === 'Reembolsado' && 'text-blue-700',
                        product.status === 'Estornado' && 'text-orange-600',
                      )
                    }
                  >
                    {product.status} ({product.status_detail.toLowerCase()})
                  </span>
                </p>
                <p className='text-zinc-700 flex flex-col mt-4'>
                  <p className='text-sm'>
                    <b className='text-yellow-700'>Total:</b> {formatCurrencyBRL(product.infoBuyer.transaction_amount)}
                  </p>
                  <p className='text-sm'>
                    <b className='text-yellow-700'>Frete:</b> {formatCurrencyBRL(product.infoBuyer.valueShipping)}
                  </p>
                  {product.infoBuyer.coupon && (
                    <p className='text-sm'>
                      <b className='text-yellow-700'>Cupom:</b> {product.infoBuyer.coupon}
                    </p>
                  )}
                </p>
                <div className='flex flex-col mt-2'>
                  {product.infoBuyer.purchasedProducts.map((productList) => (
                    <div key={`purchased-products-${productList.id}`}>
                      <p className='text-yellow-700 text-sm font-semibold mb-2'>
                        {productList.name} ({productList.quantity}x) | {formatCurrencyBRL(productList.price)} | {productList.size} ({productList.color})
                      </p>
                      <div className='flex flex-wrap-reverse items-center gap-4'>
                        <NextImage
                          src={productList?.images[0]?.url || ''}
                          alt={productList.name}
                          width='100'
                          height='0'
                          draggable='false'
                          className='rounded-md'
                        />
                        <p className='text-zinc-700 text-xs leading-4 max-w-xl w-full'>
                          {productList.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : <div className='flex justify-center'>
          <Spinner size='lg' />
        </div>}
      </div>
      <div>
        {(!isLoading && !orders?.purchasedProducts.length) && (
          <h1 className='text-center text-zinc-700 text-xl font-semibold'>
            Nenhuma encomenda!
          </h1>
        )}
      </div>
    </div >
  );
};

export default OrderList;