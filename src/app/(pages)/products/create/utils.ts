import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

import type { IProduct } from '@models/index';

import * as productsValidators from '@validators/products';

export type TProducts = z.infer<typeof schema>

export const massMeasurements: IProduct['additionalInformation']['massMeasurements'][] = ['kg', 'g'];

export const schema = z
  .object({
    ...productsValidators
  })
  .refine((fields) => !!fields.colors.length, {
    path: ['colors'],
    message: 'Informe ao menos uma cor!'
  })
  .refine((fields) => !!fields.sizes.length, {
    path: ['sizes'],
    message: 'Informe ao menos um tamanho!'
  });

export const schemaResolver = zodResolver(schema);

export const productDefaultValues: TProducts = {
  name: '',
  description: '',
  category: '',
  colors: [
    {
      name: '',
      quantity: 0
    }
  ],
  sizes: [
    {
      size: '',
      bust: '',
      waist: '',
      hip: ''
    }
  ],
  price: 0,
  installments: 0,
  discountPercentage: 0,
  weight: 0,
  massMeasurements: 'kg',
  dimensions: ''
};