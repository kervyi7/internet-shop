import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../app-config.service';
import { BaseDataService } from './base-data.service';
import { FavoriteProduct, FavoriteProductRequest } from 'src/app/models/interfaces/favorite-product';

@Injectable({
  providedIn: 'root',
})
export class FavoriteProductsDataService extends BaseDataService {
  public baseUrl = 'favoriteProducts';

  constructor(
    public readonly http: HttpClient,
    private _appConfigService: AppConfigService
  ) {
    super(_appConfigService);
  }

  public getAll(userId: string): Observable<FavoriteProduct[]> {
    return this.http.get<FavoriteProduct[]>(
      this.getUrl(userId),
      this.defaultHttpOptions
    );
  }

  public add(model: FavoriteProductRequest): Observable<FavoriteProductRequest> {
    return this.http.post<FavoriteProductRequest>(
      this.getUrl(),
      model,
      this.defaultHttpOptions
    );
  }

  public delete(model: FavoriteProductRequest): Observable<void> {
    return this.http.delete<void>(
      this.getUrl(
        `${model.userId}/${model.productId}`
      ),
      this.defaultHttpOptions
    );
  }
}
