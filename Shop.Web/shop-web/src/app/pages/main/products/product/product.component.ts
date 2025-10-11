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

@Component({
  selector: 'shop-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent extends BaseCompleteComponent implements OnInit {
  private _code: string;
  private _brand: string;
  public product: IProduct;
  public items: MenuItem[];
  public home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  public responsiveOptions: GalleriaResponsiveOptions[];
  public imagesBody: any[] = [];
  public template: IPropertyTemplate;

  constructor(
    private _productDataService: ProductDataService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _cd: ChangeDetectorRef,
    private _cartService: CartService
  ) {
    super();
  }

  public ngOnInit(): void {
    this._code = this._activatedRoute.snapshot.paramMap.get('code')!;
    this._brand = this._activatedRoute.snapshot.queryParamMap.get('brand');
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

  private loadProduct(code: string): void {
    this._productDataService
      .getByCode(code)
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((data: IProduct) => {
        data.images.map(
          (image: IImage) =>
            (image.smallBody = Converter.toFileSrc(
              image.mimeType,
              image.smallBody
            ))
        );
        data.images.map((image: IImage) => {
          image.body = Converter.toFileSrc(image.mimeType, image.body);
          const imageForGallery = {
            itemImageSrc: image.body,
            thumbnailImageSrc: image.smallBody,
            alt: 'Description',
            title: 'Title',
          };
          this.imagesBody.push(imageForGallery);
        });
        this.template = data.category.propertyTemplate;
        this.product = data;
        //this.template.push(...this.getProperties(product)); TODO:check if needed
        this.items = [
          {
            label: this.product.category.name,
            routerLink: `/${this.product.category.name}`,
          },
          { label: this.product.name },
        ];
        this._cd.detectChanges();
      });
  }
}
