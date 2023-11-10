import { z } from 'zod';

export const name = z
  .string()
  .nonempty('O nome é obrigatório!')
  .trim();

export const description = z
  .string()
  .nonempty('A descrição é obrigatória!')
  .max(50, 'A descrição deve ter no máximo 50 caracteres!')
  .trim();