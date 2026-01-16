import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { BaseDataService } from "./base-data.service";
import { AppConfigService } from "../app-config.service";
import { ICategory } from "../../models/interfaces/category";
import { IImage } from "../../models/interfaces/image";

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
    return this.http.get<ICategory>(this.getUrlById(id), this.defaultHttpOptions);
  }

  public create(category: ICategory): Observable<void> {
    return this.http.post<void>(this.getUrl(), category, this.defaultHttpOptions);
  }

  public editCategory(id: number, category: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(this.getUrlById(id), category, this.defaultHttpOptions);
  }

  public editImage(image: IImage): Observable<IImage> {
    return this.http.post<IImage>(this.getUrl("edit-image"), image, this.defaultHttpOptions);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(this.getUrlById(id), this.defaultHttpOptions);
  }
}
