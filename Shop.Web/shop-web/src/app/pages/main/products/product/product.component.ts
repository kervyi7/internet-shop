import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDataService } from '../../../../services/data/product-data.service';
import { IProduct } from '../../../../models/interfaces/product';
import { BaseCompleteComponent } from '../../../../components/base/base-complete.component';
import { MenuItem } from 'primeng/api';
import { Observable, takeUntil } from 'rxjs';
import { IProperty } from '../../../../models/interfaces/property';
import { ProductActionsService } from 'src/app/services/product-actions.service';
import { ImageMapper } from 'src/app/common/image-mapper';
import { IImage } from 'src/app/models/interfaces/image';

@Component({
  selector: 'shop-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent extends BaseCompleteComponent implements OnInit {
  private _code: string;
  public product: IProduct;
  public breadcrumbItems: MenuItem[];
  public isFav$: Observable<boolean>;
  public selectedImage: IImage;

  constructor(
    private _productDataService: ProductDataService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _productActionsService: ProductActionsService,
    private _cd: ChangeDetectorRef
  ) {
    super();
  }

  public ngOnInit(): void {
    this._code = this._activatedRoute.snapshot.paramMap.get('code')!;
    if (!this._code) {
      this._router.navigate(['./not-found']);
    }
    this.loadProduct(this._code);
  }

  public addToCart(): void {
    this._productActionsService.addToCart(this.product);
  }

  public toggleFavorite(e: MouseEvent): void {
    e.stopPropagation();
    this._productActionsService.toggleFavorite(this.product);
    this._cd.markForCheck();
  }

  public selectImage(image: IImage): void {
    this.selectedImage = image;
  }

  private loadProduct(code: string): void {
    this._productDataService
      .getByCode(code)
      .pipe(takeUntil(this.__unsubscribe$))
      .subscribe((data: IProduct) => {
        this.product = ImageMapper.mapProduct(data);
        this.isFav$ = this._productActionsService.isFavorite(data.id);
        this.selectImage(this.product.images[0]);
        this.breadcrumbItems = [
          { label: data.category.name, routerLink: `/${data.category.name}` },
          { label: data.name },
        ];
        this._cd.detectChanges();
      });
  }

  public getProperties(product: IProduct): IProperty[] {
    let properties: IProperty[] = [];
    properties.push(...product.stringProperties);
    properties.push(...product.decimalProperties);
    properties.push(...product.boolProperties);
    return properties;
  }
}
