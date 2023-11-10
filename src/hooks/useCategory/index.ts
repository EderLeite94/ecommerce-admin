'use client';

/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useState } from 'react';

import type { IUser } from '@models/index';

import { baseURL } from '@constants/api';

import { useFetch } from '@hooks/index';

import { type TCategory } from '@pages/categories/create/components/Form/utils';

import { showToast } from '@utils/toast';

const useCategory = () => {
  const base: string = 'category';

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateCategory = useCallback(async (userId: IUser['id'], categoryValues: TCategory) => {
    try {
      setIsLoading(true);

      const { response, data } = await useFetch(`${baseURL}/${base}/create/${userId}`, 'POST', categoryValues);

      showToast(data.message, response.ok);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    handleCreateCategory
  };
};

export default useCategory;