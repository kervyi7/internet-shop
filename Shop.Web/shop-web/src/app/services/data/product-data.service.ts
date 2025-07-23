import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppConfigService } from "../app-config.service";
import { IProduct, IProductResponse } from "../../models/interfaces/product";
import { BaseDataService } from "./base-data.service";
import { IGetModelsRequest } from "../../models/interfaces/get-models-request";
import { IPageData } from "../../models/interfaces/page-data";

@Injectable({
  providedIn: 'root'
})
export class ProductDataService extends BaseDataService {
  public baseUrl = 'product';

  constructor(public readonly http: HttpClient,
    private _appConfigService: AppConfigService) {
    super(_appConfigService);
  }

  public getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.getUrl(), this.defaultHttpOptions);
  }

  public getByCategory(category: string, params: IGetModelsRequest): Observable<IPageData<IProduct[]>> {
    return this.http.post<IPageData<IProduct[]>>(this.getUrl(`category/${category}/`), params, this.defaultHttpOptions);
  }

  public getFiltered(category: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.getUrl(`category/${category}`), this.defaultHttpOptions);
  }

  public getWithDiscount(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.getUrl("discounted"), this.defaultHttpOptions);
  }

  public getByCode(code: string): Observable<IProduct> {
    return new Observable<IProduct>((subscriber) => {
      this.http.get<IProductResponse>(this.getUrl(`product/${code}`), this.defaultHttpOptions)
        .subscribe({
          next: (response: IProductResponse) => {
            for (const property of response.dateProperties) {
              (property.value as unknown) = new Date(property.value);
            }
            subscriber.next(response);
          },
          error: (errorResponse: HttpErrorResponse) => subscriber.error(errorResponse),
          complete: () => subscriber.complete()
        });
    });
  }
}
