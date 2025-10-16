import { OrderStatuses } from '../enums/order-statuses';

export const OrderStatusesLabel = {
  pending: 'Pending',
  paid: 'Paid',
  paymentcancelled: 'Payment cancelled',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export const OrderStatusesLabels = [
  { name: OrderStatusesLabel.pending, value: 0 },
  { name: OrderStatusesLabel.paid, value: 1 },
  { name: OrderStatusesLabel.paymentcancelled, value: 2 },
  { name: OrderStatusesLabel.processing, value: 0 },
  { name: OrderStatusesLabel.shipped, value: 4 },
  { name: OrderStatusesLabel.delivered, value: 5 },
  { name: OrderStatusesLabel.cancelled, value: 6 },
];

export const OrderStatusOptions = Object.entries(OrderStatuses)
  .filter(([value]) => typeof value === 'number')
  .map(([key, value]) => ({
    name: OrderStatusesLabel[key as keyof typeof OrderStatusesLabel],
    value: value as number,
  }));
