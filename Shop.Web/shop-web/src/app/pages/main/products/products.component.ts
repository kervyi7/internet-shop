import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ProductDataService } from '../../../services/data/product-data.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../models/interfaces/product';
import { BaseCompleteComponent } from '../../../components/base/base-complete.component';
import { MenuItem } from 'primeng/api';
import { takeUntil } from 'rxjs';
import { IPageData } from '../../../models/interfaces/page-data';
import { PaginatorState } from 'primeng/paginator';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  ProductFilters,
  ProductRequest,
} from 'src/app/models/interfaces/filters';
import { IGetModelsRequest } from 'src/app/models/interfaces/get-models-request';
import { ScreenSizes } from 'src/app/models/enums/screen-sizes';
import { ScreenService } from 'src/app/services/screen.service';

@Component({
  selector: 'shop-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          left: '0',
        })
      ),
      state(
        'closed',
        style({
          left: '-320px',
        })
      ),
      transition('open <=> closed', [animate('0.25s')]),
    ]),
  ],
})
export class ProductsComponent extends BaseCompleteComponent implements OnInit {
  private filters: ProductFilters;
  public isMobile: boolean = false;
  public category: string;
  public products: IProduct[];
  public isFiltersOpen = false;
  public breadcrumbItems: MenuItem[];
  public home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  public pagination: IGetModelsRequest = {
    skip: 0,
    count: 10,
    sortBy: 'date_desc',
  };
  public total = 0;
  public isRowsView: boolean = false;
  public countOptions = [
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 30, value: 30 },
    { label: 40, value: 40 },
    { label: 50, value: 50 },
  ];
  public sortBy = [
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Date: Oldest First', value: 'date_asc' },
    { label: 'Date: Newest First', value: 'date_desc' },
  ];

  constructor(
    private _productDataService: ProductDataService,
    private _activatedRoute: ActivatedRoute,
    private _cd: ChangeDetectorRef,
    private screenService: ScreenService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.category = this._activatedRoute.snapshot.paramMap.get('category')!;
    if (!this.category) {
      return;
    }
    this.breadcrumbItems = [
      { label: this.category, routerLink: `/${this.category}` },
    ];
    this.loadProductList();
    this.isMobile = this.screenService.isMobile();
    this.screenService.screenSize$.subscribe((size) => {
      this.isMobile = size === ScreenSizes.Mobile;
      this._cd.detectChanges();
    });
  }

  public changeProductsView(): void {
    this.isRowsView = !this.isRowsView;
  }

  public onCountChange(): void {
    this.pagination.skip = 0;
    this.loadProductList();
  }

  public changeFiltersMenuState(): void {
    this.isFiltersOpen = !this.isFiltersOpen;
  }

  public onPageChange(event: PaginatorState): void {
    this.pagination = {
      skip: event.first,
      count: event.rows,
    };
    this.loadProductList();
  }

  public onSortingChange(): void {
    this.pagination.skip = 0;
    this.loadProductList();
  }

  public updateFilters(filters: ProductFilters): void {
    this.filters = filters;
    this.loadProductList();
    this.changeFiltersMenuState();
  }

  private loadProductList(): void {
    const params: ProductRequest = {
      ...this.pagination,
      ...this.filters,
    };
    this._productDataService
      .getByCategory(this.category, params)
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((data: IPageData<IProduct[]>) => {
        this.total = data.count;
        this.products = data.data;
        this._cd.detectChanges();
      });
  }
}
