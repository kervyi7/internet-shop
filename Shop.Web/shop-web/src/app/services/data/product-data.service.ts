import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../app-config.service';
import { IProduct, IProductResponse } from '../../models/interfaces/product';
import { BaseDataService } from './base-data.service';
import { IPageData } from '../../models/interfaces/page-data';
import { ProductRequest } from 'src/app/models/interfaces/filters';

@Injectable({
  providedIn: 'root',
})
export class ProductDataService extends BaseDataService {
  public baseUrl = 'product'; // Podstawowy fragment adresu endpointu API dotyczący produktów

  constructor(
    private readonly _http: HttpClient,             // wstrzyknięcie serwisu HttpClient do obsługi zapytań HTTP
    private _appConfigService: AppConfigService     // serwis dostarczający konfigurację aplikacji
  ) {
    super(_appConfigService);                       // przekazanie konfiguracji do klasy bazowej
  }

  // Pobranie listy wszystkich produktów z serwera (metoda GET)
  public getAll(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(this.getUrl(), this.defaultHttpOptions);
  }

  // Pobranie listy produktów według wybranej kategorii (metoda POST z parametrami filtrowania i paginacji)
  public getByCategory(
    category: string,
    params: ProductRequest
  ): Observable<IPageData<IProduct[]>> {
    return this._http.post<IPageData<IProduct[]>>(
      this.getUrl(`category/${category}/`),
      params,
      this.defaultHttpOptions
    );
  }

  // Pobranie listy produktów objętych zniżką (np. sekcja "Promocje")
  public getWithDiscount(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(
      this.getUrl('discounted'),
      this.defaultHttpOptions
    );
  }

  // Pobranie najnowszych produktów dodanych do sklepu
  public getNewProducts(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(
      this.getUrl('new'),
      this.defaultHttpOptions
    );
  }

  // Pobranie szczegółowych danych pojedynczego produktu na podstawie jego kodu
  public getByCode(code: string): Observable<IProduct> {
    return this._http.get<IProductResponse>(
      this.getUrl(`product/${code}`),
      this.defaultHttpOptions
    );
  }
}
