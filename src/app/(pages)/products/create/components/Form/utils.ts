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

export const productDefaultValues: TProducts = {
  name: '',
  description: '',
  category: '',
  installments: 1,
  additionalInformation: {
    weight: 0,
    massMeasurements: 'kg',
    dimensions: ''
  },
  images: [{
    value: ''
  }],
  productOptions: [{
    price: 0,
    promotionalPrice: 0,
    promotionalExpiryDate: new Date(),
    color: '',
    quantity: 0,
    size: '',
    bust: '',
    waist: '',
    hip: ''
  }],
};