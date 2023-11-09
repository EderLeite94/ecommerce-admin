'use client';

/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useState } from 'react';

import type { IUser } from '@models/index';

import { baseURL } from '@constants/api';

import { useFetch } from '@hooks/index';

import { showToast } from '@utils/toast';

import { type TProducts } from '@pages/products/create/components/Form/utils';

const useProduct = () => {
  const base: string = 'product';

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateProduct = useCallback(async (userId: IUser['id'], productValues: TProducts) => {
    try {
      setIsLoading(true);

      const { response, data } = await useFetch(`${baseURL}/${base}/create/${userId}`, 'POST', {
        ...productValues,
        images: ['']
      });

      showToast(data.message, response.ok);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    handleCreateProduct
  };
};

export default useProduct;