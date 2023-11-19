import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

import type { IAdmin } from '@models/index';

import { email } from '@validators/admin';

export interface IRecoveryPassword {
  email: IAdmin['owner']['email'];
}

export const recoveryPasswordDefaultValues: IRecoveryPassword = {
  email: ''
};

export const schema = zodResolver(
  z.object({
    email
  })
);