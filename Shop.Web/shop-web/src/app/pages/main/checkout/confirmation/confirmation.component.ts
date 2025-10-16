import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageMapper } from 'src/app/common/image-mapper';
import { OrderStatuses } from 'src/app/models/enums/order-statuses';
import { Order } from 'src/app/models/interfaces/order';
import { IProduct } from 'src/app/models/interfaces/product';
import { AuthService } from 'src/app/services/auth.service';
import { OrderDataService } from 'src/app/services/data/order-data.service';

@Component({
  selector: 'shop-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  public order!: Order;
  private orderId!: number;
  private userId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private orderService: OrderDataService,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.orderId = +this.route.snapshot.paramMap.get('id')!;
    this.userId = this.authService.getUserId();

    this.orderService.getById(this.orderId, this.userId).subscribe({
      next: (order) => {
        if (order.status === OrderStatuses.PaymentCancelled) {
          this.redirectToPayment();
        }
        order.items.forEach(
          (i) => (i.product = ImageMapper.mapProduct(i.product))
        );
        this.order = order;
        this.cd.detectChanges();
      },
    });
  }

  public redirect(product: IProduct): void {
    this.router.navigate([`./${product.category.name}/${product.code}`]);
  }

  private redirectToPayment(): void {
    this.router.navigate([`./checkout/payment/${this.orderId}`]);
  }
}
