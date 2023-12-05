'use client';

/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

import type { IUser, IProduct } from '@models/index';

import { baseURL } from '@constants/api';

import { useFetch } from '@hooks/index';

import { type TProducts } from '@pages/products/create/components/Form/utils';

import { showToast } from '@utils/toast';

const useProduct = () => {
  const base: string = 'product';

  const { refresh } = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateProduct = useCallback(async (userId: IUser['id'], productValues: TProducts) => {
    try {
      setIsLoading(true);

      const { response, data } = await useFetch(`${baseURL}/${base}/create/${userId}`, 'POST', productValues);

      showToast(data.message, response.ok);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleUpdateProductById = useCallback(async (userId: IUser['id'], productId: IProduct['id'], productValues: TProducts) => {
    try {
      setIsLoading(true);

      const { response, data } = await useFetch(
        `${baseURL}/${base}/update-by-id/${userId}/${productId}`,
        'PATCH',
        productValues
      );

      refresh();

      showToast(data.message, response.ok);
    } finally {
      setIsLoading(false);
    }
  }, [refresh]);

  const handleDeletProductById = useCallback(async (userId: IUser['id'], productId: IProduct['id']) => {
    try {
      setIsLoading(true);

      const { response, data } = await useFetch(`${baseURL}/${base}/delete-by-id/${userId}/${productId}`, 'DELETE');

      refresh();

      showToast(data.message, response.ok);
    } finally {
      setIsLoading(false);
    }
  }, [refresh]);

  return {
    isLoading,
    handleCreateProduct,
    handleUpdateProductById,
    handleDeletProductById
  };
};

export default useProduct;