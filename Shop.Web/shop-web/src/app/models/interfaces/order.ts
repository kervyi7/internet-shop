import { DeliveryAddress } from './delivery-address';
import { ShippingOption } from './shipping-option';

export interface Order {
  userId?: string;
  deliveryAddressId?: number;
  shippingOptionId: number;
  notes?: string;
  items: OrderItem[];
  deliveryAddress?: DeliveryAddress;
  shippingOption?: ShippingOption;
}

export interface OrderItem {
  productId: number;
  quantity: number;
}
