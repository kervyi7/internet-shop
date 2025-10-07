import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductDataService } from '../../../services/data/product-data.service';
import { Router } from '@angular/router';
import { Converter } from '../../../common/converter';
import { ICategory } from '../../../models/interfaces/category';
import { IProduct } from '../../../models/interfaces/product';
import { CategoryDataService } from '../../../services/data/category-data.service';
import { BaseCompleteComponent } from '../../../components/base/base-complete.component';
import { CarouselResponsiveOptions } from 'primeng/carousel';
import { withState } from 'src/app/components/state-switcher/utils/widget-state';

@Component({
  selector: 'shop-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends BaseCompleteComponent implements OnInit {
  public responsiveOptions: CarouselResponsiveOptions[] = [{
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

  public categoriesState$ = this._categoryDataService.getAll().pipe(
    withState((data: ICategory[]) =>
      data.map(item => ({
        ...item,
        image: {
          ...item.image,
          smallBody: Converter.toFileSrc(item.image.mimeType, item.image.smallBody)
        }
      }))
    )
  );

  public productsWithDiscountState$ = this._productDataService.getWithDiscount().pipe(
    withState((data: IProduct[]) =>
      data.map(item => ({
        ...item,
        images: item.images?.length
          ? [{
              ...item.images[0],
              body: Converter.toFileSrc(item.images[0].mimeType, item.images[0].body)
            }]
          : [{
              ...item.images[0],
              body: 'assets/img/nopicture.svg'//add to EMPTY_STATE_IMAGE
            }]
      }))
    )
  );

  constructor(
    private _productDataService: ProductDataService,
    private _categoryDataService: CategoryDataService,
    private _router: Router,
    private _cd: ChangeDetectorRef) {
    super();
  }
  public ngOnInit(): void {
    this._cd.detectChanges();
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
}
