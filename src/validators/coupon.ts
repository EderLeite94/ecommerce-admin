import { z } from 'zod';

import { tomorrow } from '@utils/date';

export const name = z
  .string()
  .nonempty('O nome é obrigatório!')
  .trim();

export const description = z
  .string()
  .nonempty()
  .max(50, 'A descrição deve ter no máximo 50 caracteres!')
  .trim();

export const code = z
  .string()
  .nonempty('O código é obrigatório!')
  .trim();

export const percentageValue = z
  .coerce
  .number()
  .min(1, 'O valor mínimo é 1%')
  .max(90, 'O valor máximo é 90%');

export const expirationDate = z
  .coerce
  .date({
    invalid_type_error: 'A data de validade deve ser válida!',
    required_error: 'A data de validade é obrigatória!'
  })
  .min(tomorrow, 'A data mínima deve ser a partir de amanhã!');