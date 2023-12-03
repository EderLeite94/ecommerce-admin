import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

import type { IAdmin } from '@models/index';

import { formatCEP, formatCNPJ, formatCPF } from '@utils/formatters';

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

export const getCompanyDefaultValues = (admin: IAdmin) => ({
  cnpj: formatCNPJ(admin?.company?.cnpj || ''),
  corporateReason: admin?.company?.corporateReason || '',
  fantasyName: admin?.company?.fantasyName || '',
  email: admin?.owner?.email || '',
  name: admin?.owner?.name || '',
  surname: admin?.owner?.surname || '',
  cpf: formatCPF(admin?.owner?.cpf || ''),
  cep: formatCEP(admin?.address?.cep || ''),
  street: admin?.address?.street || '',
  district: admin?.address?.district || '',
  number: admin?.address?.number || '',
  city: admin?.address?.city || '',
  state: admin?.address?.state || ''
});