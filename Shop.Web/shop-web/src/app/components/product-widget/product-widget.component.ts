import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { withState } from '../state-switcher/utils/widget-state';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';
import { StateSwitcherModule } from '../state-switcher/state-switcher.module';
import { ProductCardComponent } from '../product-container/product-card/product-card.component';
import { ScreenSizes } from 'src/app/models/enums/screen-sizes';
import { ScreenService } from 'src/app/services/screen.service';
import { Observable } from 'rxjs';
import { WidgetStateWithData } from '../state-switcher/state-switcher.model';
import { IProduct } from 'src/app/models/interfaces/product';

@Component({
  selector: 'shop-product-widget',
  templateUrl: './product-widget.component.html',
  styleUrls: ['./product-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule,
    StateSwitcherModule,
    ProductCardComponent,
  ],
})
export class ProductWidgetComponent implements OnInit {
  @Input() public products: Observable<IProduct[]>;
  @Input() public header: string;
  public state$: Observable<WidgetStateWithData<IProduct[]>>;
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
      breakpoint: '1100px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(
    private screenService: ScreenService,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.isMobile = this.screenService.isMobile();
    this.screenService.screenSize$.subscribe((size) => {
      this.isMobile = size === ScreenSizes.Mobile;
      this.cd.detectChanges();
    });
  }

  public ngOnChanges(): void {
    if (this.products) {
      this.state$ = this.products.pipe(withState());
    }
  }
}
