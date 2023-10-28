export interface IProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  totalQuantity: number;
  images: string[];
  colors: {
    name: string;
    quantity: number;
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
  sizes: {
    size: string;
    bust: string;
    waist: string;
    hip: string;
  }[];
  createdAt: string;
}