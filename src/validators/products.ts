import { z } from 'zod';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from './utils';

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
      .number()
      .min(1, 'O peso é obrigatório!'),
    massMeasurements: z
      .string()
      .nonempty('A medida de massa é obrigatória!')
      .trim(),
    dimensions: z
      .string()
      .nonempty('As dimensões são obrigatórias!')
      .trim()
  });

export const images = z
  .array(
    z.object({
      url: z
        .any()
        .refine((files) => !!files?.[0], 'A foto é obrigatória!')
        .refine((files) => !(files?.[0]?.size >= MAX_FILE_SIZE), 'O tamanho máximo da foto deve ser 5MB!')
        .refine(
          (files) => typeof files !== 'string' ? ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type) : true,
          'Apenas .jpg, .jpeg, .png e .webp são aceitos!'
        )
    })
  );

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
        .nonempty('A cor é obrigatória!')
        .trim(),
      quantity: z
        .coerce
        .number()
        .min(1, 'A quantidade é obrigatória!'),
      size: z
        .string()
        .nonempty('O tamanho é obrigatório!')
        .trim(),
      bust: z
        .string()
        .trim(),
      waist: z
        .string()
        .trim(),
      hip: z
        .string()
        .trim()
    })
  );