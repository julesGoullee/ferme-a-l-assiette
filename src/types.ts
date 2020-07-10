export interface Product {
  name: string;
  quantity?: number;
  unitPrice: number;
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
