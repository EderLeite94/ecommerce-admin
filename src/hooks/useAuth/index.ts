/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useState } from 'react';

import type { ISignIn } from '@models/index';

import { baseURL } from '@constants/api';

import { useFetch } from '@hooks/index';

import { showToast } from '@utils/toast';

export const useAuth = () => {
  const base: string = 'auth/admin';

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignIn = useCallback(async ({ cnpj, password }: ISignIn) => {
    const url = `${baseURL}/${base}/sign-in`;

    try {
      setIsLoading(true);

      const { response, data } = await useFetch(url, 'POST', {
        company: { cnpj },
        security: { password }
      });

      showToast(data.message, response.ok);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    handleSignIn,
    isLoading
  };
};