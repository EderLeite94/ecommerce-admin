import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

import type { IProduct } from '@models/index';

import * as productsValidators from '@validators/products';

export type TProducts = z.infer<typeof schema>

export const massMeasurements: IProduct['additionalInformation']['massMeasurements'][] = ['kg', 'g'];

export const schema = z
  .object({
    ...productsValidators
  });

export const resolver = zodResolver(schema);