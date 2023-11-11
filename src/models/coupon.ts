export interface ICoupon {
  id: string;
  name: string;
  description: string;
  code: string;
  percentageValue: number;
  expirationDate: string;
}