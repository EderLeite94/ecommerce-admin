import { z } from 'zod';

export const cnpj = z
  .string()
  .nonempty('O CNPJ é obrigatório!')
  .min(18, 'O CNPJ deve ter 14 caracteres!') // 18 including dot and dash (xx.xxx.xxx/xxxx-xx)
  .trim();

export const corporateReason = z
  .string()
  .nonempty('A razão social é obrigatória!')
  .trim();

export const fantasyName = z
  .string()
  .nonempty('O nome fantasia é obrigatório!')
  .trim();

export const email = z
  .string()
  .email({
    message: 'Formato inválido!'
  })
  .nonempty('O e-mail é obrigatório!')
  .trim();

export const name = z
  .string()
  .nonempty('O nome é obrigatório!')
  .min(2, 'O nome deve ter no mínimo 2 caracteres!')
  .max(50, 'O nome deve ter no máximo 50 caracteres!')
  .trim();

export const surname = z
  .string()
  .nonempty('O sobrenome é obrigatório!')
  .min(2, 'O sobrenome deve ter no mínimo 2 caracteres!')
  .max(50, 'O sobrenome deve ter no máximo 50 caracteres!')
  .trim();

export const cpf = z
  .string()
  .nonempty('O CPF é obrigatório!')
  .min(14, 'O CPF deve ter 11 caracteres!') // 14 including dot and dash (xxx.xxx.xxx-xx)
  .trim();

export const password = z
  .string()
  .nonempty('A senha é obrigatória!')
  .min(8, 'A senha deve ter no mínimo 8 caracteres!')
  .trim();
