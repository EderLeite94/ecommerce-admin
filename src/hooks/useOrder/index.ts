'use client';

/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

import { baseURL } from '@constants/api';

import { useFetch } from '@hooks/index';

import { showToast } from '@utils/toast';

import { IPurchases } from './utils';

const useOrder = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<{ purchasedProducts: IPurchases[] }>();

  const { refresh } = useRouter();

  const handleGetAllOrders = useCallback(async (userId: string, params: {
    page: number,
    limit: number,
    sortByDate: 'asc' | 'desc',
    status?: string
  }) => {
    try {
      setIsLoading(true);

      const { data } = await useFetch<{ body: IPurchases[] }>(
        `${baseURL}/product/get-all/product-purchase/${userId}?page=${params.page || 1}&limit=${params.limit || 10}&sortByDate=${params.sortByDate}&status=${params.status}`,
        'GET',
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignores
      setOrders(data.body);
    }
    catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCancelPurchase = useCallback(async (userId: string, purchaseId: string, infoBuyer: IPurchases['infoBuyer']) => {
    try {
      setIsLoading(true);

      const { response, data } = await useFetch(
        `${baseURL}/cancel-purchased/${userId}/${purchaseId}`,
        'POST',
        infoBuyer
      );

      refresh();

      showToast(data.message, response.ok);
    }
    catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [refresh]);

  const handleSendTrackingCode = useCallback(async (trackingCode: string, userId: string, purchaseId: string) => {
    try {
      setIsLoading(true);

      const { response, data } = await useFetch(
        `${baseURL}/insert-traking-code/${userId}/${purchaseId}`,
        'POST',
        {
          tracking_code: trackingCode
        }
      );

      showToast(data.message, response.ok);
    }
    catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    orders,
    handleGetAllOrders,
    handleCancelPurchase,
    handleSendTrackingCode
  };
};

export default useOrder;
