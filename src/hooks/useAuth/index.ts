'use client';

/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

import type { ISignIn, IUser } from '@models/index';

import { baseURL } from '@constants/api';

import { useFetch } from '@hooks/index';

import { type TCompany } from '@pages/account/update/components/Form/utils';

import { showToast } from '@utils/toast';
import { removeSpecialCharacters } from '@utils/formatters';

const useAuth = () => {
  const base: string = 'auth/admin';

  const { push, refresh } = useRouter();

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

      await useFetch(`${location.origin}/api/cookies`, 'POST', data.body);

      showToast(data.message, response.ok);

      response.ok && handleRedirectToDashboard();
    } finally {
      setIsLoading(false);
    }
  }, [push]);

  const handleUpdatePasswordById = useCallback(async (userId: IUser['id'], updatePasswordValues: {
    password: string;
    newPassword: string;
    checkPassword: string;
  }) => {
    try {
      setIsLoading(true);

      const { response, data } = await useFetch(`${baseURL}/${base}/update-password-by-id/${userId}`,
        'PATCH',
        { security: updatePasswordValues }
      );

      showToast(data.message, response.ok);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleUpdateAdminById = useCallback(async (userId: IUser['id'], adminUpdateValues: TCompany) => {
    try {
      setIsLoading(true);

      const updateValues = {
        company: {
          cnpj: removeSpecialCharacters(adminUpdateValues.cnpj),
          corporateReason: adminUpdateValues.corporateReason,
          fantasyName: adminUpdateValues.fantasyName
        },
        owner: {
          name: adminUpdateValues.name,
          surname: adminUpdateValues.surname,
          cpf: removeSpecialCharacters(adminUpdateValues.cpf),
          email: adminUpdateValues.email
        },
        address: {
          cep: removeSpecialCharacters(adminUpdateValues.cep),
          street: adminUpdateValues.street,
          number: adminUpdateValues.number,
          district: adminUpdateValues.district,
          city: adminUpdateValues.city,
          state: adminUpdateValues.state
        },
        security: {
          clientDatabases: ''
        }
      };

      const [{ response, data }] = await Promise.all([
        useFetch(`${baseURL}/${base}/update-by-id/${userId}`, 'PATCH', updateValues),
        useFetch(`${location.origin}/api/cookies`, 'POST', { id: userId, ...updateValues })
      ]);

      refresh();

      showToast(data.message, response.ok);
    } finally {
      setIsLoading(false);
    }
  }, [refresh]);

  return {
    isLoading,
    handleSignIn,
    handleUpdatePasswordById,
    handleUpdateAdminById
  };
};

export default useAuth;