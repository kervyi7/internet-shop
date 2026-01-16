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
export class TypeDataService extends BaseDataService {
  public baseUrl = 'adminProductType';

  constructor(public readonly http: HttpClient,
    private _appConfigService: AppConfigService) {
    super(_appConfigService);
  }

  public getType(): Observable<ICodeName[]> {
    return this.http.get<ICodeName[]>(this.getUrl(), this.defaultHttpOptions);
  }

  public createType(item: ICodeName): Observable<IBaseModel> {
    return this.http.post<IBaseModel>(this.getUrl(), item, this.defaultHttpOptions);
  }
}
