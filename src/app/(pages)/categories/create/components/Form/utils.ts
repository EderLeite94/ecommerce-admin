import type { ICategory } from '@models/index';

import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

import * as categoryValidators from '@validators/category';

export const categoryDefaultValues: ICategory = {
  name: '',
  description: ''
};

const schema = z.object({
  ...categoryValidators
});

export const resolver = zodResolver(schema);