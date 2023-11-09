import { z } from 'zod';

export const name = z
  .string()
  .nonempty('O nome é obrigatório!')
  .trim();

export const description = z
  .string()
  .nonempty('A descrição é obrigatória!')
  .trim();

export const category = z
  .string()
  .nonempty('A categoria é obrigatória!')
  .trim();

export const installments = z
  .coerce
  .number();

export const additionalInformation = z
  .object({
    weight: z
      .coerce
      .number(),
    massMeasurements: z
      .string()
      .trim(),
    dimensions: z
      .string()
      .trim()
  });

export const productOptions = z
  .array(
    z.object({
      price: z
        .coerce
        .number()
        .min(1, 'O preço é obrigatório!'),
      promotionalPrice: z
        .coerce
        .number(),
      promotionalExpiryDate: z
        .coerce
        .date({
          invalid_type_error: 'A data de expiração deve ser válida!',
          required_error: 'A data de expiração é obrigatória!'
        }),
      color: z
        .string()
        .nonempty('A cor é obrigatória!'),
      quantity: z
        .coerce
        .number()
        .min(1, 'A quantidade é obrigatória!'),
      size: z
        .string(),
      bust: z
        .string(),
      waist: z
        .string(),
      hip: z
        .string()
    })
  );