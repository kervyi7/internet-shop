import { OrderStatuses } from '../enums/order-statuses';
import { IBaseModel } from './base/base-model';
import { DeliveryAddress } from './delivery-address';
import { IProduct } from './product';
import { ShippingOption } from './shipping-option';

export interface Order extends IBaseModel {
  userId?: string;
  deliveryAddressId?: number;
  shippingOptionId: number;
  notes?: string;
  status?: OrderStatuses;
  items: OrderItem[];
  deliveryAddress?: DeliveryAddress;
  shippingOption?: ShippingOption;
  totalPrice?: number;
  date?: string;
}

export interface OrderItem {
  productId: number;
  product?: IProduct;
  quantity: number;
  priceAtPurchase?: number;
}
