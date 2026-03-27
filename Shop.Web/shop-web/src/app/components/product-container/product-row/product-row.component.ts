import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IProduct } from 'src/app/models/interfaces/product';
import {
  IProperty,
  IPropertyTemplate,
} from 'src/app/models/interfaces/property';
import { PropertiesListModule } from '../../properties-list/properties-list.module';
import { ProductActionsService } from 'src/app/services/product-actions.service';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { FavoritesButtonComponent } from '../../favorites-button/favorites-button.component';
import { PropertiesViewComponent } from '../../properties-view/properties-view.component';

@Component({
  selector: 'shop-product-row',
  templateUrl: './product-row.component.html',
  styleUrls: ['./product-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    PropertiesListModule,
    ButtonModule,
    FavoritesButtonComponent,
    PropertiesViewComponent,
  ],
})
export class ProductRowComponent implements OnInit {
  @Input() public product: IProduct;
  public properties: IProperty[];
  public template: IPropertyTemplate;
  public isFav$!: Observable<boolean>;

  constructor(
    private productActions: ProductActionsService,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.product = this.productActions.convertImages(this.product);
    this.properties = this.productActions.getProperties(this.product);
    this.template = this.productActions.getTemplate(this.product);
    this.isFav$ = this.productActions.isFavorite(this.product.id);
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
