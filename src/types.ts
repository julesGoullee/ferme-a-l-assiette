export enum Unit {
  KG = 'kg',
  PIECE = 'piece',
  TRANCHE = 'tranche',
  DOUZAINE = 'douzaine',
  DEMI_DOUZAINE = '½ douzaine'
}

export interface Product {
  id: string;
  name: string;
  quantity?: number;
  unitPrice: number;
  unit: Unit;
}

export interface Order {
  email: string,
  name: string,
  phone: string,
  address: {
    street: string,
    city: string,
    postalCode: string,
  },
  products: Product[],
  total: number,
  deliveryDate: string,
}
