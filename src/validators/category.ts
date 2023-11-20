import { z } from 'zod';

import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from './utils';

export const name = z
  .string()
  .nonempty('O nome é obrigatório!')
  .trim();

export const description = z
  .string()
  .nonempty('A descrição é obrigatória!')
  .max(50, 'A descrição deve ter no máximo 50 caracteres!')
  .trim();

export const image = z
  .any()
  .refine((files) => !!files?.[0], 'A foto é obrigatória!')
  .refine((files) => !(files?.[0]?.size >= MAX_FILE_SIZE), 'O tamanho máximo da foto deve ser 5MB!')
  .refine(
    (files) => typeof files !== 'string' ? ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type) : true,
    'Apenas .jpg, .jpeg, .png e .webp são aceitos!'
  );