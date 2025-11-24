import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FavoritesButtonComponent } from '../../favorites-button/favorites-button.component';
import { PropertiesListModule } from '../../properties-list/properties-list.module';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/models/interfaces/product';
import { ProductActionsService } from 'src/app/services/product-actions.service';

@Component({
  selector: 'shop-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PropertiesListModule,
    ButtonModule,
    FavoritesButtonComponent,
  ],
})
export class ProductCardComponent {
  @Input() public product: IProduct;
  public isFav$!: Observable<boolean>;
  public discountedPercent = 0;

  constructor(
    private productActions: ProductActionsService,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.product = this.productActions.convertImages(this.product);
    this.isFav$ = this.productActions.isFavorite(this.product.id);
    this.discountedPercent = this.productActions.getDiscountPercentage(this.product)
    this.cd.markForCheck();
  }

  public addToCart(e: MouseEvent): void {
    e.stopPropagation();
    this.productActions.addToCart(this.product);
    this.cd.markForCheck();
  }

  public toggleFavorite(e: MouseEvent): void {
    e.stopPropagation();
    this.productActions.toggleFavorite(this.product);
    this.cd.markForCheck();
  }

  public redirect(): void {
    this.productActions.redirect(this.product.category.name, this.product.code);
  }
}
