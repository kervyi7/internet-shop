import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseCompleteComponent } from '../../../components/base/base-complete.component';
import { takeUntil } from 'rxjs';
import { AdminProductDataService } from '../../../services/data/admin/admin-product-data.service';
import { IProduct } from '../../../models/interfaces/product';
import { Converter } from '../../../common/converter';
import { ConfirmationService } from 'primeng/api';

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
    private _router: Router,
    private _confirmationService: ConfirmationService) {
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

  public tryDelete(e: Event, product: IProduct): void {
    e.stopPropagation();
    this._confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      accept: () => {
        this._adminProductDataService.delete(product.id)
          .pipe(takeUntil(this.__unsubscribe$))
          .subscribe(() => {
            this.load();
            this._cd.detectChanges();
          });
      },
      reject: () => {
        return;
      }
    });
  }

  private load(): void {
    this.displayService.changeStateLoadBar(true);
    this._adminProductDataService.getAll()
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((data: IProduct[]) => {
        this.products = data;
        for (let product of this.products) {
          if (product.images[0]) {
            product.images[0].smallBody = Converter.toFileSrc(product.images[0].mimeType, product.images[0].smallBody);
          }
        }
        this.displayService.changeStateLoadBar(false);
        this._cd.detectChanges();
      });
  }
}
