import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IProduct } from '../models/interfaces/product';
import { CartService } from './cart.service';
import { FavoritesService } from './favorites.service';
import { Router } from '@angular/router';
import { IProperty, IPropertyTemplate } from '../models/interfaces/property';
import { Observable, take } from 'rxjs';
import { Converter } from '../common/converter';

@Injectable({ providedIn: 'root' })
export class ProductActionsService {
  constructor(
    private cartService: CartService,
    private favoriteService: FavoritesService,
    private messageService: MessageService,
    private _router: Router
  ) {}

  public addToCart(product: IProduct): void {
    this.cartService.add(product);
    this.messageService.add({
      severity: 'success',
      summary: 'Added to cart',
      detail: `${product.name} added successfully.`,
    });
  }

  public toggleFavorite(product: IProduct): void {
    this.favoriteService
      .isFavorite$(product.id)
      .pipe(take(1))
      .subscribe((isFav) => {
        if (isFav) {
          this.favoriteService.removeFromFavorites(product.id);
        } else {
          this.favoriteService.addToFavorites(product);
        }
      });
  }

  public isFavorite(id: number): Observable<boolean> {
    return this.favoriteService.isFavorite$(id);
  }

  public redirect(categoryName: string, code: string): void {
    if (!categoryName || !code) return;
    this._router.navigate([`/${categoryName}`, code]);
  }

  public getProperties(product: IProduct): IProperty[] {
    let properties: IProperty[] = [];
    properties.push(...product.stringProperties);
    properties.push(...product.decimalProperties);
    properties.push(...product.boolProperties);
    //properties.push(...product.dateProperties);
    return properties;
  }

  public getTemplate(product: IProduct): IPropertyTemplate {
    return product.category.propertyTemplate;
  }

  public convertImages(product: IProduct): IProduct {
    if (!product.images || product.images.length === 0) {
      return {
        ...product,
        images: [
          {
            id: 0,
            mimeType: 'image/svg+xml',
            smallBody: 'assets/img/nopicture.svg',
            body: 'assets/img/nopicture.svg',
            name: 'nopicture',
          },
        ],
      };
    }

    const images = product.images.map((image) => ({
      ...image,
      smallBody: Converter.toFileSrc(image.mimeType, image.smallBody),
      body: Converter.toFileSrc(image.mimeType, image.body),
    }));

    return {
      ...product,
      images,
    };
  }

  public getDiscountPercentage(product: IProduct): number {
    return product.discountedPrice
      ? Math.round(100 - (product.discountedPrice / product.price) * 100)
      : 0;
  }
}
