import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/models/interfaces/product';
import { ProductDataService } from 'src/app/services/data/product-data.service';
import { FavoriteProductsDataService } from 'src/app/services/data/favorite-product-data.service';
import { ProductWidgetComponent } from 'src/app/components/product-widget/product-widget.component';
import { ProductSectionType } from 'src/app/models/enums/product-section';

@Component({
  selector: 'shop-product-sections',
  standalone: true,
  imports: [CommonModule, ProductWidgetComponent],
  templateUrl: './product-sections.component.html',
})
export class ProductSectionsComponent implements OnInit {
  @Input() public sections: ProductSectionType[] = [];
  @Input() public userId: string;

  public sectionData: {
    key: string;
    title: string;
    products$: Observable<IProduct[]>;
  }[] = [];

  constructor(
    private productService: ProductDataService,
    private favoriteService: FavoriteProductsDataService
  ) {}

  public ngOnInit(): void {
    if (this.sections.includes(ProductSectionType.New)) {
      this.sectionData.push({
        key: 'new',
        title: 'Our new',
        products$: this.productService.getNewProducts(),
      });
    }

    if (this.sections.includes(ProductSectionType.Discounted)) {
      this.sectionData.push({
        key: 'discounted',
        title: 'Sale',
        products$: this.productService.getWithDiscount(),
      });
    }

    if (this.sections.includes(ProductSectionType.Favorite)) {
      this.sectionData.push({
        key: 'Favorite',
        title: 'Your favorites',
        products$: this.favoriteService.getFirstTwenty(this.userId),
      });
    }
  }
}
