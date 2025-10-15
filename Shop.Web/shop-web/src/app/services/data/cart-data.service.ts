import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from '../app-config.service';
import {
  CartItem,
  CartItemDeleteRequest,
  CartItemRequest,
} from 'src/app/models/interfaces/cart';
import { BaseDataService } from './base-data.service';

@Injectable({
  providedIn: 'root',
})
export class CartDataService extends BaseDataService {
  public baseUrl = 'cart';

  constructor(
    public readonly http: HttpClient,
    private _appConfigService: AppConfigService
  ) {
    super(_appConfigService);
  }

  public getAll(userId: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(
      this.getUrl(userId),
      this.defaultHttpOptions
    );
  }

  public add(model: CartItemRequest): Observable<void> {
    return this.http.post<void>(this.getUrl(), model, this.defaultHttpOptions);
  }

  public deleteSelected(model: CartItemDeleteRequest): Observable<any> {
    return this.http.post(
      this.getUrl(`/delete-selected`),
      model,
      this.defaultHttpOptions
    );
  }

  public delete(model: CartItemRequest): Observable<void> {
    return this.http.delete<void>(
      this.getUrl(`${model.userId}/${model.productId}`),
      this.defaultHttpOptions
    );
  }

  public clear(userId: string): Observable<void> {
    return this.http.delete<void>(
      this.getUrl(`${userId}/clear`),
      this.defaultHttpOptions
    );
  }

  public selectAll(userId: string, isSelected: boolean): Observable<void> {
    return this.http.post<void>(
      this.getUrl(`${userId}/select-all/${isSelected}`),
      {},
      this.defaultHttpOptions
    );
  }
}
