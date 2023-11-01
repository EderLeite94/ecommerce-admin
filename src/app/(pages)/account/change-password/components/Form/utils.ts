import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

import { password, newPassword, checkPassword } from '@validators/admin';

export type TChangePassword = z.infer<typeof schema>

export const changePasswordDefaultValues: TChangePassword = {
  password: '',
  newPassword: '',
  checkPassword: ''
};

const schema = z.object({
  password,
  newPassword,
  checkPassword
}).superRefine(({ newPassword, checkPassword }, { addIssue }) => {
  (checkPassword !== newPassword) && addIssue({
    code: 'custom',
    path: ['checkPassword'],
    message: 'As senhas não conferem!'
  });
});

export const resolver = zodResolver(schema);