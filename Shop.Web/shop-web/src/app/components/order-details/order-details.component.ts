import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OrderStatuses } from 'src/app/models/enums/order-statuses';
import { Order } from 'src/app/models/interfaces/order';
import { AccordionModule } from 'primeng/accordion';
import { OrderStatusesLabel } from 'src/app/models/constants/order-statuses';
import { IProduct } from 'src/app/models/interfaces/product';

@Component({
  selector: 'shop-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonModule, AccordionModule],
})
export class OrderDetailsComponent {
  @Input() public orders!: Order[];
  @Input() public isExpanded: boolean = false;
  @Input() public showPayButton: boolean = true;
  @Input() public isEditable: boolean = false;

  @Output() public pay = new EventEmitter<void>();
  @Output() public edit = new EventEmitter<Order>();
  @Output() public productClick = new EventEmitter<IProduct>();

  public readonly statuses = OrderStatuses;

  public getStatusName(order: Order): string {
    if (order?.status === undefined) return '';

    const key = OrderStatuses[order.status]
      .replace(/\s+/g, '')
      .toLowerCase() as keyof typeof OrderStatusesLabel;
    return OrderStatusesLabel[key] || '';
  }

  public onPayClick(e: MouseEvent): void {
    e.stopPropagation();
    this.pay.emit();
  }

  public onEdit(order: Order): void {
    this.edit.emit(order);
  }

  public onProductClick(product: IProduct): void {
    this.productClick.emit(product);
  }
}
