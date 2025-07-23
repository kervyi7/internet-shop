import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductDataService } from '../../../services/data/product-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../models/interfaces/product';
import { Converter } from '../../../common/converter';
import { BaseCompleteComponent } from '../../../components/base/base-complete.component';
import { MenuItem } from 'primeng/api';
import { takeUntil } from 'rxjs';
import { IProperty, IPropertyAll, IPropertyTemplate } from '../../../models/interfaces/property';
import { IGetModelsRequest } from '../../../models/interfaces/get-models-request';
import { IPageData } from '../../../models/interfaces/page-data';
import { PaginatorState } from 'primeng/paginator';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';

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
          left: '0'
        }),
      ),
      state(
        'closed',
        style({
          left: '-320px'
        }),
      ),
      transition('open <=> closed', [animate('0.25s')]),
    ]),
  ],
})
export class ProductsComponent extends BaseCompleteComponent implements OnInit {
  private category: string;
  public products: IProduct[];
  public isFiltersOpen = false;
  public isShowLayout = false;
  public items: MenuItem[];
  public home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  //public templateProperties: IProperty[] = [];
  public template: IPropertyTemplate;
  public skip = 0;
  public countPerPage = 10;
  public count = 0;
  public countOptions = [
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 30, value: 30 }
  ];
  public sortBy = [
    { label: "price high to low" },
    { label: "price low to high" }
  ];

  constructor(private _productDataService: ProductDataService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _cd: ChangeDetectorRef) {
    super();
  }

  public ngOnInit(): void {
    this.category = this._activatedRoute.snapshot.paramMap.get('category')!;
    if (!this.category) {
      return;
    }
    this.items = [{ label: this.category, routerLink: `/${this.category}` }];
    this.loadProductList(this.category);
  }

  public goToProduct(product: IProduct): void {
    this._router.navigate([`/${product.category.name}`, product.code]);
  }

  public getProperties(product: IProduct): IProperty[] {
    let properties: IProperty[] = [];
    properties.push(...product.stringProperties);
    properties.push(...product.decimalProperties);
    properties.push(...product.boolProperties);
    properties.push(...product.dateProperties);
    return properties;
  }

  public onCountChange(): void {
    this.skip = 0;
    this.loadProductList(this.category);
  }

  public changeFiltersMenuState(): void {
    this.isFiltersOpen = !this.isFiltersOpen;
    this.isShowLayout = true;
  }

  // public onAnimationDone(event: AnimationEvent): void {
  //   if (event.fromState == 'void') {
  //     return;
  //   }
  //   event.fromState == 'closed' ? this.isShowLayout = false : this.isShowLayout = true;
  // }

  public onPageChange(event: PaginatorState): void {
    this.skip = event.first;
    this.countPerPage = event.rows;
    this.loadProductList(this.category);
  }

  public loadProductList(category: string): void {
    const params: IGetModelsRequest = {
      skip: this.skip,
      count: this.countPerPage
    }
    this._productDataService.getByCategory(category, params)
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((data: IPageData<IProduct[]>) => {
        this.template = data.data[0].category.propertyTemplate;
        data.data.map((item: IProduct) => {
          item.images[0].smallBody = Converter.toFileSrc(item.images[0].mimeType, item.images[0].smallBody)
        });
        this.count = data.count;
        this.products = data.data;
        // for (let product of this.products) {
        //   this.templateProperties.push(...this.getProperties(product));
        // }
        this._cd.detectChanges();
      });
  }
}
