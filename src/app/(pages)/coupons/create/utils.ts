import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

import type { ICoupon } from '@models/index';

import * as couponValidators from '@validators/coupon';

export const couponDefaultValues: ICoupon = {
  name: '',
  description: '',
  code: '',
  percentageValue: 0,
  expirationDate: ''
};

export const schema = zodResolver(
  z.object({
    ...couponValidators
  })
);