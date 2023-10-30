import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import type { ISignIn } from '@models/index';

import { cnpj, password } from '@validators/admin';

export const signInDefaultValues: ISignIn = {
  cnpj: '',
  password: ''
};

const schema = z.object({
  cnpj,
  password
});

export const resolver = zodResolver(schema);