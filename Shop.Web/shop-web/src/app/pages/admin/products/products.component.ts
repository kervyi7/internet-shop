import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseCompleteComponent } from '../../../components/base/base-complete.component';
import { takeUntil } from 'rxjs';
import { AdminProductDataService } from '../../../services/data/admin-product-data.service';
import { IProduct } from '../../../models/interfaces/product';

@Component({
  selector: 'shop-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent extends BaseCompleteComponent implements OnInit {
  public products: IProduct[] = [];

  constructor(
    private _adminProductDataService: AdminProductDataService,
    private _cd: ChangeDetectorRef,
    private _router: Router) {
    super();
  }

  public ngOnInit(): void {
    this.load();
  }

  public edit(product: IProduct): void {
    this._router.navigate(['admin/products/edit', product.id]);
  }

  public create(): void {
    this._router.navigate(['admin/products/create']);
  }

  public delete(e: Event, product: IProduct): void {
    e.stopPropagation();
    this._adminProductDataService.delete(product.id)
      .subscribe(() => {
        this.load();
      });
  }

  private load(): void {
    this._adminProductDataService.getAll()
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((data: IProduct[]) => {
        this.products = data;
        this._cd.detectChanges();
      });
  }
}
