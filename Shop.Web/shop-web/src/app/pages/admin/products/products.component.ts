import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseCompleteComponent } from '../../../components/base/base-complete.component';
import { takeUntil } from 'rxjs';
import { AdminProductDataService } from '../../../services/data/admin/admin-product-data.service';
import { IProduct } from '../../../models/interfaces/product';
import { Converter } from '../../../common/converter';
import { ConfirmationService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { IGetModelsRequest } from 'src/app/models/interfaces/get-models-request';
import { IPageData } from 'src/app/models/interfaces/page-data';
import { LabelValueModel, sortByForProducts } from 'src/app/models/interfaces/filters';
import { SortingType } from 'src/app/models/enums/sorting-types';

@Component({
  selector: 'shop-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent extends BaseCompleteComponent implements OnInit {
  public products: IProduct[] = [];
  public total: number = 0;
  public sortingConfig: LabelValueModel[] = sortByForProducts;
  public pagination: IGetModelsRequest = {
    skip: 0,
    count: 5,
    sortBy: SortingType.date_desc,
  };

  constructor(
    private _adminProductDataService: AdminProductDataService,
    private _cd: ChangeDetectorRef,
    private _router: Router,
    private _confirmationService: ConfirmationService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.loadProducts();
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
        this._adminProductDataService
          .delete(product.id)
          .pipe(takeUntil(this.__unsubscribe$))
          .subscribe(() => {
            this.loadProducts();
            this._cd.detectChanges();
          });
      },
      reject: () => {
        return;
      },
    });
  }

  public onPaginationFiltersChange(event: IGetModelsRequest): void {
    this.pagination = event;
    this.loadProducts();
  }

  public onPageChange(event: PaginatorState): void {
    this.pagination = {
      ...this.pagination,
      skip: event.first,
      count: event.rows,
    };
    this.loadProducts();
  }

  private loadProducts(): void {
    this._adminProductDataService
      .getAll(this.pagination)
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((data: IPageData<IProduct[]>) => {
        this.products = data.data;
        this.total = data.count;
        for (let product of this.products) {
          if (product.images[0]) {
            product.images[0].smallBody = Converter.toFileSrc(
              product.images[0].mimeType,
              product.images[0].smallBody
            );
          }
        }
        this._cd.detectChanges();
      });
  }
}
