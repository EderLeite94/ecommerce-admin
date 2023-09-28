import { IAddress } from '@models/index';

export interface IAdmin {
  id: string;
  company: {
    email: string;
    cnpj: string;
    corporateReason: string;
    fantasyName: string;
  };
  owner: {
    name: string;
    surname: string;
    cpf: string;
  };
  address: IAddress;
  password: string;
  createdAt: string;
}