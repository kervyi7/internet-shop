import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BaseDataService } from '../base-data.service';
import { AppConfigService } from '../../app-config.service';
import { IProduct, IProductResponse } from '../../../models/interfaces/product';
import { IImage } from '../../../models/interfaces/image';
import { IProperty } from '../../../models/interfaces/property';
import { Converter } from '../../../common/converter';
import { IGetModelsRequest } from 'src/app/models/interfaces/get-models-request';
import { IPageData } from 'src/app/models/interfaces/page-data';

@Injectable({
  providedIn: 'root',
})
export class AdminProductDataService extends BaseDataService {
  public baseUrl = 'adminProduct';

  constructor(
    public readonly http: HttpClient,
    appConfigService: AppConfigService
  ) {
    super(appConfigService);
  }

  public getAll(params: IGetModelsRequest): Observable<IPageData<IProduct[]>> {
    return this.http.post<IPageData<IProduct[]>>(
      this.getUrl('get'),
      params,
      this.defaultHttpOptions
    );
  }

  public getById(id: number): Observable<IProduct> {
    return new Observable<IProduct>((subscriber) => {
      this.http
        .get<IProductResponse>(this.getUrlById(id), this.defaultHttpOptions)
        .subscribe({
          next: (response: IProductResponse) => {
            Converter.prepareProperties(response);
            subscriber.next(response);
          },
          error: (errorResponse: HttpErrorResponse) =>
            subscriber.error(errorResponse),
          complete: () => subscriber.complete(),
        });
    });
  }

  public create(product: IProduct): Observable<IProductResponse> {
    return new Observable<IProductResponse>((subscriber) => {
      this.http
        .post<IProductResponse>(this.getUrl(), product, this.defaultHttpOptions)
        .subscribe({
          next: (response: IProductResponse) => {
            debugger
            Converter.prepareProperties(response);
            subscriber.next(response);
          },
          error: (errorResponse: HttpErrorResponse) =>
            subscriber.error(errorResponse),
          complete: () => subscriber.complete(),
        });
    });
  }

  public edit(id: number, product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(
      this.getUrlById(id),
      product,
      this.defaultHttpOptions
    );
  }

  public editProperty(
    id: number,
    property: IProperty
  ): Observable<propertyValue> {
    return this.http.put<propertyValue>(
      this.getUrl(`edit-property/${property.type}/${id}`),
      property,
      this.defaultHttpOptions
    );
  }

  public addImage(image: IImage): Observable<void> {
    return this.http.post<void>(
      this.getUrl('add-image'),
      image,
      this.defaultHttpOptions
    );
  }

  public deleteImage(id: number, image: IImage): Observable<IProduct> {
    return this.http.delete<IProduct>(
      this.getUrlById(`remove-image/${id}/image/${image.id}`),
      this.defaultHttpOptions
    );
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(this.getUrlById(id), this.defaultHttpOptions);
  }
}
