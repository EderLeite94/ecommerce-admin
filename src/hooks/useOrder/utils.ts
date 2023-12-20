import type { IAddress } from '@models/index';

export interface IPurchases {
  'external_resource_url': null,
  'ticket_url': string,
  'status': string,
  'status_detail': string,
  'infoBuyer': {
    'transaction_amount': number,
    'valueShipping': number,
    'createdAt': string,
    'paymentID': string,
    'id': string,
    user: {
      'info': {
        'identification': {
          'type': 'CNPJ' | 'CPF',
          'number': string
        },
        'id': string,
        'name': string,
        'surname': string,
        'photo': string,
        'email': string
      },
      address: IAddress,
      deliveryAddress: IAddress,
    }
    'coupon': string,
    purchasedProducts: {
      productId: string;
      name: string;
      description: string;
      images: { url: string }[]
      id: string;
      color: string;
      size: string;
      quantity: number;
      totalQuantity: number;
      category: string;
      price: number;
      promotionalPrice?: number;
      promotionalExpiryDate?: string;
      bust: string;
      waist: string;
      hip: string;
      additionalInformation: {
        weight: number;
        massMeasurements: 'kg' | 'g';
        dimensions: string;
      };
    }[];
  }
}
