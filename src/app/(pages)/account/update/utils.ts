import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

import type { IAddress, IAdmin } from '@models/index';

import { cnpj, corporateReason, fantasyName, email, name, surname, cpf } from '@validators/admin';
import * as addressValidators from '@validators/address';

export interface ICompany {
  cnpj: IAdmin['company']['cnpj'];
  corporateReason: IAdmin['company']['corporateReason'];
  fantasyName: IAdmin['company']['fantasyName'];
  email: IAdmin['company']['email'];
  name: IAdmin['owner']['name'];
  surname: IAdmin['owner']['surname'];
  cpf: IAdmin['owner']['cpf'];
  cep: IAddress['cep'];
  street: IAddress['street'];
  district: IAddress['district'];
  number: IAddress['number'];
  city: IAddress['city'];
  state: IAddress['state'];
}

export const companyDefaultValues: ICompany = {
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

export const schema = zodResolver(
  z.object({
    cnpj,
    corporateReason,
    fantasyName,
    email,
    name,
    surname,
    cpf,
    ...addressValidators
  })
);