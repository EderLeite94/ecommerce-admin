import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

import { cnpj, corporateReason, fantasyName, email, name, surname, cpf } from '@validators/admin';
import * as addressValidators from '@validators/address';

export type TCompany = z.infer<typeof schema>;

const schema = z
  .object({
    cnpj,
    corporateReason,
    fantasyName,
    email,
    name,
    surname,
    cpf,
    ...addressValidators
  });

export const resolver = zodResolver(schema);

export const companyDefaultValues: TCompany = {
  cnpj: '',
  corporateReason: '',
  fantasyName: '',
  email: '',
  name: '',
  surname: '',
  cpf: '',
  cep: '',
  street: '',
  district: '',
  number: '',
  city: '',
  state: ''
};