import { Address, User } from './usertype';
import { Product } from './ProductType';

// Order status enum
export enum OrderStatus {
  PENDING = 'PENDING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

// Payment status enum (based on Java backend)
export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

// Interface for PaymentDetails (based on Java class)
export interface PaymentDetails {
  paymentId: string;
  razorpayPaymentLinkId: string;
  razorpayPaymentLinkreferenceId: string;
  razorpayPaymentLinkStatus: string;
  razorpayPaymentIdZWSP: string;
  status: PaymentStatus;
}

// Interface for individual order items
export interface OrderItems {
  id: number;
  order: Order;
  product: Product;
  sizes: string;
  quantity: number;
  mrpPrice: number;
  totalPrice:number;
  sellingPrice: number;
  userId: number;
}

// Interface for Order
export interface Order {
  id: number;
  orderId: string;
  user: User;
  sellerId: number;
  orderItems: OrderItems[];
  orderDate: string;
  shippingAddress: Address;
  paymentDetails: PaymentDetails;
  paymentStatus:PaymentStatus;
  totalMrpPrice: number;
  totalSellingPrice?: number;
  discount?: number;
  orderStatus: OrderStatus;
  totalItem: number;
  deliverDate: string;
  totalPrice:number
}

// Interface for Redux Order State
export interface OrderState {
  orders: Order[];
  orderItem: OrderItems | null;
  currentOrder: Order | null;
  paymentOrder: Order | null;
  loading: boolean;
  error: string | null;
  orderCanceled: boolean;
}
