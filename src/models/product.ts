export interface IProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  totalQuantity: number;
  images: {
    value: string;
  }[];
  payment: {
    price: number;
    installments: number;
    discountPercentage: number;
  };
  additionalInformation: {
    weight: number;
    massMeasurements: 'kg' | 'g';
    dimensions: string;
  };
  productOptions: {
    id: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
    promotionalPrice?: number;
    promotionalExpiryDate?: string;
    bust: string;
    waist: string;
    hip: string;
  }[];
  createdAt: string;
}
