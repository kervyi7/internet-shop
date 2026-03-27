import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { FavoriteProductsDataService } from './data/favorite-product-data.service';
import { FavoriteProductRequest } from '../models/interfaces/favorite-product';
import { IProduct } from '../models/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private userId: string | null;
  private _favorites$ = new ReplaySubject<IProduct[]>(1);
  private favoritesCache: IProduct[] = [];

  constructor(
    private _authService: AuthService,
    private _favoriteDataService: FavoriteProductsDataService,
    private _router: Router
  ) {
    this.userId = this._authService.getUserId();
    this._favorites$.subscribe((list) => {
      this.favoritesCache = list ?? [];
    });
    if (this.userId) {
      this.loadFavorites(this.userId);
    }
  }

  public get favorites$(): Observable<IProduct[]> {
    return this._favorites$.asObservable();
  }

  public addToFavorites(product: IProduct): void {
    if (!this.userId) {
      this.redirectToLogin();
      return;
    }

    this._favoriteDataService
      .add(this.createRequest(product.id, this.userId))
      .pipe(
        tap(() => {
          if (!this.favoritesCache.find((p) => p.id === product.id)) {
            this.favoritesCache = [...this.favoritesCache, product];
            this._favorites$.next(this.favoritesCache);
          }
        })
      )
      .subscribe();
  }

  public removeFromFavorites(productId: number): void {
    if (!this.userId) {
      this.redirectToLogin();
      return;
    }

    this._favoriteDataService
      .delete(this.createRequest(productId, this.userId))
      .pipe(
        tap(() => {
          this.favoritesCache = this.favoritesCache.filter(
            (p) => p.id !== productId
          );
          this._favorites$.next(this.favoritesCache);
        })
      )
      .subscribe();
  }

  public isFavorite$(productId: number): Observable<boolean> {
    return this._favorites$.pipe(
      map((favorites: IProduct[]) => favorites.some((p) => p.id === productId))
    );
  }

  public getUserId(): string | null {
    return this.userId;
  }

  private loadFavorites(userId: string): void {
    this._favoriteDataService.getAll(userId).subscribe((favorites) => {
      const products = favorites.map((f) => f.product);
      this._favorites$.next(products);
    });
  }

  private createRequest(
    productId: number,
    userId: string
  ): FavoriteProductRequest {
    return { productId, userId };
  }

  private redirectToLogin(): void {
    this._router.navigate(['/login']);
  }
}
