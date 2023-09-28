import { IAddress } from '@models/index';

export interface IUser {
  id: string;
  name: string;
  surname: string;
  photo: string;
  cpf: string;
  email: string;
  address: IAddress;
  password: string;
  createdAt: string;
}