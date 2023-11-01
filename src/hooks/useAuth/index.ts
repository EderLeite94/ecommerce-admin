/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

import type { ISignIn, IUser } from '@models/index';

import { baseURL } from '@constants/api';

import { useFetch } from '@hooks/index';

import { showToast } from '@utils/toast';
import { removeSpecialCharacters } from '@utils/formatters';

export const useAuth = () => {
  const base: string = 'auth/admin';

  const { push } = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignIn = useCallback(async ({ cnpj, password }: ISignIn) => {
    const handleRedirectToDashboard = () => push('/dashboard');

    try {
      setIsLoading(true);

      const { response, data } = await useFetch<{ body: IUser }>(`${baseURL}/${base}/sign-in`, 'POST', {
        company: {
          cnpj: removeSpecialCharacters(cnpj)
        },
        security: { password }
      });

      await useFetch(`${location.href}/api/cookies`, 'POST', data.body);

      showToast(data.message, response.ok);

      handleRedirectToDashboard();
    } finally {
      setIsLoading(false);
    }
  }, [push]);

  return {
    handleSignIn,
    isLoading
  };
};