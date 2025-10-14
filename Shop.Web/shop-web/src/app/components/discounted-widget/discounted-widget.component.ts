import { Component, OnInit } from '@angular/core';
import { withState } from '../state-switcher/utils/widget-state';
import { RouterModule } from '@angular/router';
import { ProductDataService } from 'src/app/services/data/product-data.service';
import { CommonModule } from '@angular/common';
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';
import { StateSwitcherModule } from '../state-switcher/state-switcher.module';
import { ProductCardComponent } from '../product-container/product-card/product-card.component';
import { ScreenSizes } from 'src/app/models/enums/screen-sizes';
import { ScreenService } from 'src/app/services/screen.service';

@Component({
  selector: 'shop-discounted-widget',
  templateUrl: './discounted-widget.component.html',
  styleUrls: ['./discounted-widget.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule,
    StateSwitcherModule,
    ProductCardComponent,
  ],
})
export class DiscountedWidgetComponent implements OnInit {
  public isMobile: boolean = false;
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
    .pipe(withState());

  constructor(
    private _productDataService: ProductDataService,
    private screenService: ScreenService
  ) {}

  public ngOnInit(): void {
    this.isMobile = this.screenService.isMobile();
    this.screenService.screenSize$.subscribe((size) => {
      this.isMobile = size === ScreenSizes.Mobile;
    });
  }
}
