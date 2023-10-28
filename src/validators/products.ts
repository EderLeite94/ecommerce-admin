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

export const colors = z
  .array(
    z.object({
      name: z
        .string()
        .nonempty('A cor é obrigatória!'),
      quantity: z
        .coerce
        .number()
        .min(1, 'A quantidade é obrigatória!')
    })
  );

export const sizes = z
  .array(
    z.object({
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

export const price = z
  .coerce
  .number()
  .min(1, 'O preço é obrigatório!');

export const installments = z
  .coerce
  .number();

export const discountPercentage = z
  .coerce
  .number();

export const weight = z
  .coerce
  .number();

export const massMeasurements = z
  .string()
  .trim();

export const dimensions = z
  .string()
  .trim();
