import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageMapper } from 'src/app/common/image-mapper';
import { Order } from 'src/app/models/interfaces/order';
import { AuthService } from 'src/app/services/auth.service';
import { OrderDataService } from 'src/app/services/data/order-data.service';
import { PaymentService } from 'src/app/services/data/payment-data.service';

@Component({
  selector: 'shop-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentComponent implements OnInit {
  public order!: Order;
  private orderId!: number;
  private userId!: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private paymentService: PaymentService,
    private orderService: OrderDataService,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.orderId = +this.route.snapshot.paramMap.get('id')!;
    this.userId = this.authService.getUserId();

    this.orderService.getById(this.orderId, this.userId).subscribe({
      next: (order) => {
        order.items.forEach(
          (i) => (i.product = ImageMapper.mapProduct(i.product))
        );

        this.order = order;
        this.cd.detectChanges();
      },
    });
  }

  public buy(): void {
    const total = this.order.items.reduce(
      (sum, item) =>
        sum +
        (item.product?.discountedPrice ?? item.product?.price ?? 0) *
          (item.quantity || 1),
      this.order.shippingOption?.cost ?? 0
    );
    this.paymentService.pay(total, 'Order Payment', this.order.id);
  }
}
