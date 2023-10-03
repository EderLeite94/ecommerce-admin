import { z } from 'zod';

export const cep = z
  .string()
  .nonempty('O CEP é obrigatório!')
  .min(9, 'O CEP deve ter 8 caracteres!') // 9 including dash (xxxxx-xxx)
  .trim();

export const street = z
  .string()
  .nonempty('O endereço é obrigatório!')
  .trim();

export const district = z
  .string()
  .nonempty('O bairro é obrigatório!')
  .trim();

export const number = z
  .string()
  .nonempty('O número é obrigatório!')
  .trim();

export const city = z
  .string()
  .nonempty('A cidade é obrigatória!')
  .trim();

export const state = z
  .string()
  .nonempty('O estado é obrigatório!')
  .trim();
