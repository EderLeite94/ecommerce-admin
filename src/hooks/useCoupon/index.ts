'use client';

/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useState } from 'react';

import type { ICoupon, IUser } from '@models/index';

import { baseURL } from '@constants/api';

import { useFetch } from '@hooks/index';

import { showToast } from '@utils/toast';

const useCoupon = () => {
  const base: string = 'coupon';

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateCoupon = useCallback(async (userId: IUser['id'], couponValues: ICoupon) => {
    try {
      setIsLoading(true);

      const { response, data } = await useFetch(`${baseURL}/${base}/create/${userId}`, 'POST', couponValues);

      showToast(data.message, response.ok);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    handleCreateCoupon
  };
};

export default useCoupon;