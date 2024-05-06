import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseDataService } from './base-data.service';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../app-config.service';
import { ICodeName } from '../../models/interfaces/base/code-name';
import { IBaseModel } from '../../models/interfaces/base/base-model';

@Injectable({
  providedIn: 'root'
})
export class UtilityDataService extends BaseDataService {
  public baseUrl = '';
  private _urls: string[] = ['adminProductType', 'adminProductBrand'];

  constructor(public readonly http: HttpClient,
    appConfigService: AppConfigService) {
    super(appConfigService);
  }

  public getType(): Observable<ICodeName[]> {
    this.baseUrl = this._urls[0];
    return this.http.get<ICodeName[]>(this.getUrl(), this.defaultHttpOptions);
  }

  public getBrand(): Observable<ICodeName[]> {
    this.baseUrl = this._urls[1];
    return this.http.get<ICodeName[]>(this.getUrl(), this.defaultHttpOptions);
  }

  public createType(item: ICodeName): Observable<IBaseModel> {
    this.baseUrl = this._urls[0];
    return this.http.post<IBaseModel>(this.getUrl(), item, this.defaultHttpOptions);
  }

  public createBrand(item: ICodeName): Observable<IBaseModel> {
    this.baseUrl = this._urls[1];
    return this.http.post<IBaseModel>(this.getUrl(), item, this.defaultHttpOptions);
  }
}
