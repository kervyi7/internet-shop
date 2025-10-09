import { ChangeDetectorRef, Component } from '@angular/core';
import { Converter } from 'src/app/common/converter';
import { IProduct } from 'src/app/models/interfaces/product';
import { withState } from '../state-switcher/utils/widget-state';
import { Router, RouterModule } from '@angular/router';
import { ProductDataService } from 'src/app/services/data/product-data.service';
import { CommonModule } from '@angular/common';
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';
import { StateSwitcherModule } from '../state-switcher/state-switcher.module';

@Component({
  selector: 'shop-discounted-widget',
  templateUrl: './discounted-widget.component.html',
  styleUrls: ['./discounted-widget.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, CarouselModule, StateSwitcherModule],
})
export class DiscountedWidgetComponent {
  public responsiveOptions: CarouselResponsiveOptions[] = [
    {
      breakpoint: '1699px',
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: '1399px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  public productsWithDiscountState$ = this._productDataService
    .getWithDiscount()
    .pipe(
      withState((data: IProduct[]) =>
        data.map((item) => ({
          ...item,
          images: item.images?.length
            ? [
                {
                  ...item.images[0],
                  body: Converter.toFileSrc(
                    item.images[0].mimeType,
                    item.images[0].body
                  ),
                },
              ]
            : [
                {
                  ...item.images[0],
                  body: 'assets/img/nopicture.svg', //add to EMPTY_STATE_IMAGE
                },
              ],
        }))
      )
    );

  constructor(
    private _productDataService: ProductDataService,
    private _router: Router,
    private _cd: ChangeDetectorRef
  ) {}

  public goToProduct(product: IProduct): void {
    this._router.navigate([`/${product.category.name}`, product.code]);
  }

  public getDiscountPercentage(product: IProduct): number {
    return Math.round(100 - (product.discountPrice / product.price) * 100);
  }
}
