import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseDataService } from '../base-data.service';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../app-config.service';
import { ICodeName } from '../../../models/interfaces/base/code-name';
import { IBaseModel } from '../../../models/interfaces/base/base-model';

@Injectable({
  providedIn: 'root'
})
export class BrandDataService extends BaseDataService {
  public baseUrl = 'adminProductBrand';

  constructor(public readonly http: HttpClient,
    private _appConfigService: AppConfigService) {
    super(_appConfigService);
  }

  public getBrand(): Observable<ICodeName[]> {
    return this.http.get<ICodeName[]>(this.getUrl(), this.defaultHttpOptions);
  }

  public createBrand(item: ICodeName): Observable<IBaseModel> {
    return this.http.post<IBaseModel>(this.getUrl(), item, this.defaultHttpOptions);
  }
}
