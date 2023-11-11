'use client';

/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

import type { ICoupon, IUser } from '@models/index';

import { baseURL } from '@constants/api';

import { useFetch } from '@hooks/index';

import { showToast } from '@utils/toast';

const useCoupon = () => {
  const base: string = 'coupon';

  const { refresh } = useRouter();

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

  const handleDeleteCouponById = useCallback(async (userId: IUser['id'], couponId: ICoupon['id']) => {
    try {
      setIsLoading(true);

      const { response, data } = await useFetch(`${baseURL}/${base}/delete-by-id/${userId}/${couponId}`, 'DELETE');

      refresh();

      showToast(data.message, response.ok);
    } finally {
      setIsLoading(false);
    }
  }, [refresh]);

  return {
    isLoading,
    handleCreateCoupon,
    handleDeleteCouponById
  };
};

export default useCoupon;