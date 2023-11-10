import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

import * as categoryValidators from '@validators/category';

export type TCategory = z.infer<typeof schema>

export const categoryDefaultValues: TCategory = {
  name: '',
  description: ''
};

const schema = z.object({
  ...categoryValidators
});

export const resolver = zodResolver(schema);