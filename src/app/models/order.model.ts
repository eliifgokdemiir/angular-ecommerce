// src/app/models/order.model.ts
import { Product } from './product.model';
import { Address } from './address.model';

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  date: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  totalPrice: number;
  shippingAddress: Address;
  paymentMethod: string;
}