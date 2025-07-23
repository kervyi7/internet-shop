import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductDataService } from '../../../services/data/product-data.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Converter } from '../../../common/converter';
import { ICategory } from '../../../models/interfaces/category';
import { IProduct } from '../../../models/interfaces/product';
import { CategoryDataService } from '../../../services/data/category-data.service';
import { BaseCompleteComponent } from '../../../components/base/base-complete.component';
import { CarouselResponsiveOptions } from 'primeng/carousel';

@Component({
  selector: 'shop-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends BaseCompleteComponent implements OnInit {
  public categories: ICategory[];
  public productsWithDiscount: IProduct[];
  responsiveOptions: CarouselResponsiveOptions[] = [{
    breakpoint: '1699px',
    numVisible: 4,
    numScroll: 1
  },
  {
    breakpoint: '1399px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '991px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 1,
    numScroll: 1
  }
  ];

  constructor(
    private _productDataService: ProductDataService,
    private _categoryDataService: CategoryDataService,
    private _router: Router,
    private _cd: ChangeDetectorRef) {
    super();
  }
  public ngOnInit(): void {
    this.loadCategories();
    this.loadProductsWithDiscount();
  }

  public goToProductList(categoryName: string): void {
    this._router.navigate([`/${categoryName}`]);
  }

  public goToProduct(product: IProduct): void {
    this._router.navigate([`/${product.category.name}`, product.code]);
  }

  public getDiscountPercentage(product: IProduct): number {
    return Math.round(100 - (product.discountPrice / product.price * 100));
  }

  private loadCategories(): void {
    this._categoryDataService.getAll()
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((data: ICategory[]) => {
        data.map((item: ICategory) => item.image.smallBody = Converter.toFileSrc(item.image.mimeType, item.image.smallBody));
        this.categories = data;
        this._cd.detectChanges();
      });
  }

  private loadProductsWithDiscount(): void {
    this._productDataService.getWithDiscount()
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((data: IProduct[]) => {
        data.map((item: IProduct) => {
          if (item.images.length) {
            item.images[0].body = Converter.toFileSrc(item.images[0].mimeType, item.images[0].body);
          }
        });
        this.productsWithDiscount = data;
        this._cd.detectChanges();
      });
  }
}
