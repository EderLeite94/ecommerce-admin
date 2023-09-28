import { z } from 'zod';

export const cnpj = z
  .string()
  .nonempty('O CNPJ é obrigatório!')
  .trim();

export const password = z
  .string()
  .nonempty('A senha é obrigatória!')
  .min(8, 'A senha deve ter no mínimo 8 caracteres!')
  .trim();

