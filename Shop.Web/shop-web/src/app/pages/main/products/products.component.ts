import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductDataService } from '../../../services/data/product-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../models/interfaces/product';
import { Converter } from '../../../common/converter';
import { BaseCompleteComponent } from '../../../components/base/base-complete.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'shop-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseCompleteComponent implements OnInit {
  private category: string;
  public products: IProduct[];
  public items: MenuItem[];
  public home: MenuItem = { icon: 'home', routerLink: '/' };
  constructor(private _productDataService: ProductDataService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _cd: ChangeDetectorRef) {
    super();
  }

  public ngOnInit(): void {
    this.category = this._activatedRoute.snapshot.paramMap.get('category')!;
    if (!this.category) {
      return;
    }
    this.items = [{ label: this.category, routerLink: `/${this.category}` }];
    this.loadProductList(this.category);
  }

  public goToProduct(product: IProduct): void {
    this._router.navigate([`/${product.category.name}`, product.code]);
  }

  public loadProductList(category: string): void {
    this._productDataService.getByCategory(category).subscribe((data: IProduct[]) => {
      data.map((item: IProduct) => item.images[0].smallBody = Converter.toFileSrc(item.images[0].mimeType, item.images[0].smallBody));
      this.products = data;
      this._cd.detectChanges();
    });
  }
}
