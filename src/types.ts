// export interface RootState {
//   version: string;
// }
//
// export interface OrderState {
//
// }
//
// export interface ProductsState {
//
// }

declare global {

  interface Window {
    instgrm: any;
  }

}

export enum Unit {
  KG = 'kg',
  PIECE = 'piece',
  TRANCHE = 'tranche',
}

export interface Product {
  id: string;
  name: string;
  label: string;
  group?: string;
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
  id: string;
  email: string;
  name: string;
  phone: string;
  address: Address;
  products: Product[];
  total: number;
  deliveryDate: string;
}
