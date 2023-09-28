import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

import type { IAdmin } from '@models/index';

import { cnpj, password } from '@validators/admin';

export interface ISignIn {
  cnpj: IAdmin['company']['cnpj'];
  password: IAdmin['password'];
}

export const signInDefaultValues: ISignIn = {
  cnpj: '',
  password: ''
};

export const schema = zodResolver(
  z.object({
    cnpj,
    password
  })
);