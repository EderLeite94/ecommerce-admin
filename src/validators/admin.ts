import { z } from 'zod';

export const email = z
  .string()
  .email({
    message: 'Formato inválido!'
  })
  .nonempty('O e-mail é obrigatório!')
  .trim();

export const cnpj = z
  .string()
  .nonempty('O CNPJ é obrigatório!')
  .min(18, 'O CNPJ deve ter 14 caracteres!')
  .trim();

export const password = z
  .string()
  .nonempty('A senha é obrigatória!')
  .min(8, 'A senha deve ter no mínimo 8 caracteres!')
  .trim();

