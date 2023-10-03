import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

import type { IAdmin } from '@models/index';

import { password, newPassword, confirmNewPassword } from '@validators/admin';

export interface IChangePassword {
  currentPassword: IAdmin['password'];
  newPassword: IAdmin['password'];
  confirmNewPassword: IAdmin['password'];
}

export const passwordTips: string[] = [
  'Evite sequências óbvias, como "12345678" ou "abcdefgh". Elas são fáceis de adivinhar.',
  'Certifique-se de que sua nova senha seja exclusiva e não seja usada em outras contas.',
  'Evite compartilhar sua senha com outras pessoas.',
  'Atualize sua senha regularmente para manter sua conta segura.',
  'Utilize um gerenciador de senhas para manter o controle de senhas complexas de forma segura.'
];

export const changePasswordDefaultValues: IChangePassword = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: ''
};

export const schema = zodResolver(
  z.object({
    password,
    newPassword,
    confirmNewPassword
  }).superRefine(({ newPassword, confirmNewPassword }, { addIssue }) => {
    (confirmNewPassword !== newPassword) && addIssue({
      code: 'custom',
      path: ['confirmNewPassword'],
      message: 'As senhas não conferem!'
    });
  })
);