import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ICategory } from '../../models/interfaces/category';
import { IProduct } from '../../models/interfaces/product';
import { Router } from '@angular/router';
import { ProductDataService } from '../../services/data/product-data.service';
import { CategoryDataService } from '../../services/data/category-data.service';
import { Converter } from '../../common/converter';
import { BaseCompleteComponent } from '../../components/base/base-complete.component';

@Component({
  selector: 'shop-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent extends BaseCompleteComponent implements OnInit {
  public isAuthorized: boolean;
  public categories: ICategory[];
  public productsWithSale: IProduct[];

  constructor(private _authService: AuthService,
    private _productDataService: ProductDataService,
    private _categoryDataService: CategoryDataService,
    private _router: Router,
    private _cd: ChangeDetectorRef) {
    super();
  }

  public ngOnInit(): void {
    this.isAuthorized = this._authService.isLoggedIn();
    this.loadCategories();
    this.loadProductsWithSale();
  }

  public goToAdmin(): void {
    this._router.navigate(['/admin']);
  }

  public goToProductList(categoryName: string): void {
    //categoryName = categoryName.toLowerCase();
    this._router.navigate([`/${categoryName}`]);
  }

  public goToProduct(product: IProduct): void {
    this._router.navigate([`/${product.category.name}`, product.code]);
  }

  private loadCategories(): void {
    this._categoryDataService.getAll().subscribe((data: ICategory[]) => {
      data.map((item: ICategory) => item.image.smallBody = Converter.toFileSrc(item.image.mimeType, item.image.smallBody));
      this.categories = data;
      this._cd.detectChanges();
    });
  }

  private loadProductsWithSale(): void {
    this._productDataService.getWithSale().subscribe((data: IProduct[]) => {
      data.map((item: IProduct) => item.images[0].smallBody = Converter.toFileSrc(item.images[0].mimeType, item.images[0].smallBody));
      this.productsWithSale = data;
      this._cd.detectChanges();
    });
  }
}
