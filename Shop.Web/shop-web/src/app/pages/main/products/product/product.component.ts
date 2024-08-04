import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDataService } from '../../../../services/data/product-data.service';
import { Converter } from '../../../../common/converter';
import { IProduct } from '../../../../models/interfaces/product';
import { IImage } from '../../../../models/interfaces/image';
import { BaseCompleteComponent } from '../../../../components/base/base-complete.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'shop-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent extends BaseCompleteComponent implements OnInit {
  private _code: string;
  private _brand: string;
  public product: IProduct;
  public items: MenuItem[];
  public home: MenuItem = { icon: 'home', routerLink: '/' };

  constructor(private _productDataService: ProductDataService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _cd: ChangeDetectorRef) {
    super();
  }

  public ngOnInit(): void {
    this._code = this._activatedRoute.snapshot.paramMap.get('code')!;
    this._brand = this._activatedRoute.snapshot.queryParamMap.get('brand');
    if (!this._code) {
      return;
    }
    this.loadProduct(this._code);
  }

  private loadProduct(code: string): void {
    this._productDataService.getByCode(code).subscribe((data: IProduct) => {
      data.images.map((image: IImage) => image.smallBody = Converter.toFileSrc(image.mimeType, image.smallBody));
      this.product = data;
      this.items = [{ label: this.product.category.name, routerLink: `/${this.product.category.name}` }, { label: this.product.brand.name, routerLink: `/${this.product.category.name}`, queryParams: { ['brand']: this.product.brand.name } }, { label: this.product.name }];
      this._cd.detectChanges();
    });
  }
}
