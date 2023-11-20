'use client';

/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

import type { ICategory, IUser } from '@models/index';

import { baseURL } from '@constants/api';

import { useFetch } from '@hooks/index';

import { showToast } from '@utils/toast';

const useCategory = () => {
  const base: string = 'category';

  const { refresh } = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateCategory = useCallback(async (userId: IUser['id'], categoryValues: Omit<ICategory, 'id'>) => {
    try {
      setIsLoading(true);

      const { response, data } = await useFetch(`${baseURL}/${base}/create/${userId}`, 'POST', categoryValues);

      showToast(data.message, response.ok);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteCategoryById = useCallback(async (userId: IUser['id'], categoryId: ICategory['id']) => {
    try {
      setIsLoading(true);

      const { response, data } = await useFetch(`${baseURL}/${base}/delete-by-id/${userId}/${categoryId}`, 'DELETE');

      refresh();

      showToast(data.message, response.ok);
    } finally {
      setIsLoading(false);
    }
  }, [refresh]);

  return {
    isLoading,
    handleCreateCategory,
    handleDeleteCategoryById
  };
};

export default useCategory;