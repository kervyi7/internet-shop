import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BaseDataService } from "../base-data.service";
import { AppConfigService } from "../../app-config.service";
import { ICategory, ICategoryResponse } from "../../../models/interfaces/category";
import { IImage } from "../../../models/interfaces/image";
import { IProperty, IPropertyTemplate } from "../../../models/interfaces/property";
import { IBaseModel } from "../../../models/interfaces/base/base-model";
import { PropertyTypes } from "../../../models/enums/property-types";

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryDataService extends BaseDataService {
  public baseUrl = 'adminCategory';

  constructor(public readonly http: HttpClient,
    private _appConfigService: AppConfigService) {
    super(_appConfigService);
  }

  public getAll(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.getUrl(), this.defaultHttpOptions);
  }

  public getById(id: number): Observable<ICategory> {
    return new Observable<ICategory>((subscriber) => {
      this.http.get<ICategoryResponse>(this.getUrlById(id), this.defaultHttpOptions).subscribe({
        next: (response: ICategoryResponse) => {
          if (!response.propertyTemplate) {
            subscriber.next(response);
            return;
          }
          for (const property of response.propertyTemplate.dateProperties) {
            (property.value as unknown) = new Date(property.value);
            property.type = PropertyTypes.date;
          }
          for (const property of response.propertyTemplate.stringProperties) {
            property.type = PropertyTypes.string;
          }
          for (const property of response.propertyTemplate.decimalProperties) {
            property.type = PropertyTypes.number;
          }
          for (const property of response.propertyTemplate.boolProperties) {
            property.type = PropertyTypes.bool;
          }
          subscriber.next(response);
        },
        error: (errorResponse: HttpErrorResponse) => subscriber.error(errorResponse),
        complete: () => subscriber.complete()
      });
    });
  }

  public create(category: ICategory): Observable<IBaseModel> {
    return this.http.post<IBaseModel>(this.getUrl(), category, this.defaultHttpOptions);
  }

  public createTemplate(template: IPropertyTemplate): Observable<IBaseModel> {
    return this.http.post<IBaseModel>(this.getUrl("add-template"), template, this.defaultHttpOptions);
  }

  public addProperty(property: IProperty): Observable<void> {
    return this.http.post<void>(this.getUrl(`add-property/${property.type}`), property, this.defaultHttpOptions);
  }

  public deleteProperty(id: number, property: IProperty): Observable<void> {
    return this.http.delete<void>(this.getUrlById(`remove-property/${id}/property/${property.id}/type/${property.type}`), this.defaultHttpOptions);
  }

  public editCategory(id: number, category: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(this.getUrlById(id), category, this.defaultHttpOptions);
  }

  public editTemplate(template: IPropertyTemplate): Observable<IPropertyTemplate> {
    return this.http.put<IPropertyTemplate>(this.getUrlById(`edit-template/${template.id}`), template, this.defaultHttpOptions);
  }

  public editProperty(id: number, property: IProperty): Observable<propertyValue> {
    return this.http.put<propertyValue>(this.getUrl(`edit-property/${property.type}/${id}`), property, this.defaultHttpOptions);
  }

  public editImage(id: number, image: IImage): Observable<IImage> {
    return this.http.post<IImage>(this.getUrlById(`edit-image/${id}`), image, this.defaultHttpOptions);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(this.getUrlById(id), this.defaultHttpOptions);
  }
}
