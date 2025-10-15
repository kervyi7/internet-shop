import { IProduct } from './product';

export interface CartItem {
  userId: string;
  productId: number;
  product: IProduct;
  quantity: number;
  isSelected?: boolean;
}

export interface CartItemRequest {
  userId: string;
  productId: number;
  quantity: number;
}

export interface CartItemDeleteRequest {
  userId: string;
  productIds: number[];
}
