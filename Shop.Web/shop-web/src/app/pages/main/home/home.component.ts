import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Converter } from '../../../common/converter';
import { ICategory } from '../../../models/interfaces/category';
import { CategoryDataService } from '../../../services/data/category-data.service';
import { BaseCompleteComponent } from '../../../components/base/base-complete.component';
import { withState } from 'src/app/components/state-switcher/utils/widget-state';
import { AuthService } from 'src/app/services/auth.service';
import { ProductSectionType } from 'src/app/models/enums/product-section';
import { InfoPageDataService } from 'src/app/services/data/info-pages-data.service';
import { InfoPage } from 'src/app/models/interfaces/info-pages';
import { Banner, BannerTypes } from 'src/app/models/interfaces/banner';
import { ImageMapper } from 'src/app/common/image-mapper';
import { BannerDataService } from 'src/app/services/data/banners-data.service';
import { ScreenSizes } from 'src/app/models/enums/screen-sizes';
import { ScreenService } from 'src/app/services/screen.service';

@Component({
  selector: 'shop-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends BaseCompleteComponent implements OnInit {
  public showModalBanner: boolean = false;
  public userId: string;
  public SectionType = ProductSectionType;
  public aboutSection: InfoPage | null = null;
  public promoBanner!: Banner;
  public adGallery!: Banner;
  public modalBanner!: Banner;
  public isMobile: boolean = false;
  public categoriesState$ = this._categoryDataService.getAll().pipe(
    withState((data: ICategory[]) =>
      data.map((item) => ({
        ...item,
        image: {
          ...item.image,
          body: Converter.toFileSrc(item.image.mimeType, item.image.body),
        },
      }))
    )
  );

  constructor(
    private infoPageDataService: InfoPageDataService,
    private bannerDataService: BannerDataService,
    private _categoryDataService: CategoryDataService,
    private _authService: AuthService,
    private _router: Router,
    private screenService: ScreenService,
    private _cd: ChangeDetectorRef
  ) {
    super();
  }

  public ngOnInit(): void {
    this.userId = this._authService.getUserId();
    this.infoPageDataService.getByKey('about').subscribe((section) => {
      this.aboutSection = section;
      this._cd.detectChanges();
    });
    this.bannerDataService.getAll().subscribe((list) => {
      this.promoBanner = list.find((x) => x.type == BannerTypes.promo)!;
      this.adGallery = list.find((x) => x.type == BannerTypes.adGallery)!;
      this.modalBanner = list.find((x) => x.type == BannerTypes.modal)!;

      if (this.adGallery) {
        this.adGallery.images = ImageMapper.mapIImages(this.adGallery.images);
      }

      const modalBannerShown = Boolean(
        sessionStorage.getItem('modal-banner-is-shown')
      );
      
      if (this.modalBanner && !modalBannerShown) {
        this.modalBanner.images = ImageMapper.mapIImages(
          this.modalBanner.images
        );
        this.showModalBanner = true;
        sessionStorage.setItem('modal-banner-is-shown', 'true');
      }

      this._cd.detectChanges();
    });
    this.isMobile = this.screenService.isTablet();
    this.screenService.screenSize$.subscribe((size) => {
      this.isMobile = size !== ScreenSizes.Desktop;
      this._cd.detectChanges();
    });
  }

  public goToProductList(categoryName: string): void {
    this._router.navigate([`/${categoryName}`]);
  }
}
