import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { Router } from '@angular/router';
import { ImageMapper } from 'src/app/common/image-mapper';
import { Order } from 'src/app/models/interfaces/order';
import { IProduct } from 'src/app/models/interfaces/product';
import { AuthService } from 'src/app/services/auth.service';
import { OrderDataService } from 'src/app/services/data/order-data.service';

@Component({
  selector: 'shop-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {
  private userId: string;
  public orders: Order[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private orderService: OrderDataService,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.userId = this.authService.getUserId();

    this.orderService.getAll(this.userId).subscribe({
      next: (orders) => {
        orders.forEach((order) => {
          order.items.forEach(
            (item) => (item.product = ImageMapper.mapProduct(item.product))
          );
        });

        this.orders = orders;
        this.cd.detectChanges();
      },
    });
  }

  public redirect(product: IProduct): void {
    this.router.navigate([`./${product.category.name}/${product.code}`]);
  }
}
