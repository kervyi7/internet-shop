import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { ICategory } from "../../models/interfaces/category";
import { AppConfigService } from "../app-config.service";
import { BaseDataService } from "./base-data.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryDataService extends BaseDataService {
  public baseUrl = 'category';

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
}
