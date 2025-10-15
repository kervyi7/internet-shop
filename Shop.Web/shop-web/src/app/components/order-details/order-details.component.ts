import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OrderStatuses } from 'src/app/models/enums/order-statuses';
import { Order } from 'src/app/models/interfaces/order';

@Component({
  selector: 'shop-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonModule],
})
export class OrderDetailsComponent {
  @Input() order!: Order;
  @Input() showPayButton = false;

  @Output() pay = new EventEmitter<void>();

  public readonly statuses = OrderStatuses;

  public get statusName(): string {
    return this.order?.status !== undefined
      ? OrderStatuses[this.order.status]
      : '';
  }

  public canPay(): boolean {
    return (
      this.order?.status === OrderStatuses.Pending ||
      this.order?.status === OrderStatuses.PaymentCancelled
    );
  }

  public getTotal(): number {
    if (!this.order) return 0;
    const itemsTotal = this.order.items.reduce(
      (sum, i) =>
        sum +
        (i.priceAtPurchase ?? 0) * (i.quantity || 1),
      0
    );
    return itemsTotal + (this.order.shippingOption?.cost ?? 0);
  }

  public onPayClick(): void {
    this.pay.emit();
  }
}
