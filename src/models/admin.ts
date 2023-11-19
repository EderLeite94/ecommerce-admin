import { IAddress } from '@models/index';

export interface IAdmin {
  id: string;
  company: {
    cnpj: string;
    corporateReason: string;
    fantasyName: string;
  };
  owner: {
    name: string;
    surname: string;
    email: string;
    cpf: string;
  };
  address: IAddress;
  password: string;
  createdAt: string;
}