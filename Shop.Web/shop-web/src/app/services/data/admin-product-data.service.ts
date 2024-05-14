import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BaseDataService } from "./base-data.service";
import { AppConfigService } from "../app-config.service";
import { ICreateProduct, IProduct, IProductResponse, } from "../../models/interfaces/product";
import { IImage } from "../../models/interfaces/image";
import { IBaseModel } from "../../models/interfaces/base/base-model";
import { IProperty } from "../../models/interfaces/property";
import { Util } from "../../common/util";

@Injectable({
  providedIn: 'root'
})
export class AdminProductDataService extends BaseDataService {
  public baseUrl = 'adminProduct';

  constructor(public readonly http: HttpClient,
    appConfigService: AppConfigService) {
    super(appConfigService);
  }

  public getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.getUrl(), this.defaultHttpOptions);
  }

  public getById(id: number): Observable<IProduct> {
    return new Observable<IProduct>((subscriber) => {
      this.http.get<IProductResponse>(this.getUrlById(id), this.defaultHttpOptions)
        .subscribe({
          next: (response: IProductResponse) => {
            const product = { ...response, dateProperties: response.dateProperties.map(x => new Date(x)) };
            subscriber.next(product);
          },
          error: (errorResponse: HttpErrorResponse) => subscriber.error(errorResponse),
          complete: () => subscriber.complete()
        });
    });
  }

  public create(product: ICreateProduct): Observable<IBaseModel> {
    return this.http.post<IBaseModel>(this.getUrl(), product, this.defaultHttpOptions);
  }

  public edit(id: number, product: ICreateProduct): Observable<ICreateProduct> {
    return this.http.put<ICreateProduct>(this.getUrlById(id), product, this.defaultHttpOptions);
  }

  public addProperty(property: IProperty): Observable<void> {
    const type = Util.getPropertyType(property);
    return this.http.post<void>(this.getUrl(`add-property/${type}`), property, this.defaultHttpOptions);
  }

  public editProperty(id: number, property: IProperty): Observable<propertyValue> {
    const type = Util.getPropertyType(property);
    return this.http.put<propertyValue>(this.getUrl(`edit-property/${type}/${id}`), property, this.defaultHttpOptions);
  }

  public addImage(image: IImage): Observable<void> {
    return this.http.post<void>(this.getUrl('add-image'), image, this.defaultHttpOptions);
  }

  public deleteImage(id: number, image: IImage): Observable<IProduct> {
    return this.http.delete<IProduct>(this.getUrlById(`remove-image/${id}/image/${image.id}`), this.defaultHttpOptions);
  }

  public deleteProperty(id: number, property: IProperty): Observable<void> {
    const type = Util.getPropertyType(property);
    return this.http.delete<void>(this.getUrlById(`remove-property/${id}/property/${property.id}/type/${type}`), this.defaultHttpOptions);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(this.getUrlById(id), this.defaultHttpOptions);
  }
}
