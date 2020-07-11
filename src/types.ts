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
  label: string;
  quantity?: number;
  unitPrice: number;
  unit: Unit;
}

export interface Address {
  street: string;
  city: string;
  postalCode: string;
}

export interface Order {
  email: string;
  name: string;
  phone: string;
  address: Address;
  products: Product[];
  total: number;
  deliveryDate: string;
}
