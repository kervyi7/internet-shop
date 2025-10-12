import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDataService } from '../../../../services/data/product-data.service';
import { Converter } from '../../../../common/converter';
import { IProduct } from '../../../../models/interfaces/product';
import { IImage } from '../../../../models/interfaces/image';
import { BaseCompleteComponent } from '../../../../components/base/base-complete.component';
import { MenuItem } from 'primeng/api';
import { takeUntil } from 'rxjs';
import { GalleriaResponsiveOptions } from 'primeng/galleria';
import {
  IProperty,
  IPropertyTemplate,
} from '../../../../models/interfaces/property';
import { CartService } from 'src/app/services/data/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'shop-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent extends BaseCompleteComponent implements OnInit {
  private _code: string;
  public product: IProduct;
  public items: MenuItem[];
  public home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  public responsiveOptions: GalleriaResponsiveOptions[];
  public imagesBody: any[] = [];
  public template: IPropertyTemplate;
  public isFavorite = false;

  constructor(
    private _productDataService: ProductDataService,
    private _activatedRoute: ActivatedRoute,
    private _cd: ChangeDetectorRef,
    private _cartService: CartService,
    private _favoritesService: FavoritesService
  ) {
    super();
  }

  public ngOnInit(): void {
    this._code = this._activatedRoute.snapshot.paramMap.get('code')!;
    if (!this._code) {
      return;
    }
    this.loadProduct(this._code);
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5,
      },
      {
        breakpoint: '768px',
        numVisible: 3,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
      },
    ];
    this._favoritesService.favorites$
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((favorites) => {
        if (this.product) {
          this.isFavorite = favorites.includes(this.product);
          this._cd.markForCheck();
        }
      });
  }

  public getProperties(product: IProduct): IProperty[] {
    let properties: IProperty[] = [];
    properties.push(...product.stringProperties);
    properties.push(...product.decimalProperties);
    properties.push(...product.boolProperties);
    properties.push(...product.dateProperties);
    return properties;
  }

  public addToCart(): void {
    this._cartService.addToCart(this.product);
  }

  public toggleFavorite(): void {
    if (this.isFavorite) {
      this._favoritesService.removeFromFavorites(this.product.id);
    } else {
      this._favoritesService.addToFavorites(this.product);
    }
  }

  private loadProduct(code: string): void {
    this._productDataService
      .getByCode(code)
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((data: IProduct) => {
        this.imagesBody = data.images.map((image: IImage) => {
          image.smallBody = Converter.toFileSrc(
            image.mimeType,
            image.smallBody
          );
          image.body = Converter.toFileSrc(image.mimeType, image.body);
          return {
            itemImageSrc: image.body,
            thumbnailImageSrc: image.smallBody,
            alt: data.name,
            title: data.name,
          };
        });
        this.template = data.category.propertyTemplate;
        this.product = data;
        this.items = [
          {
            label: data.category.name,
            routerLink: `/${data.category.name}`,
          },
          { label: data.name },
        ];
        this.isFavorite = this._favoritesService.isFavorite(data.id);
        this._cd.detectChanges();
      });
  }
}
