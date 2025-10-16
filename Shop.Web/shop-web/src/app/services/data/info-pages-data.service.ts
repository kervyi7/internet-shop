import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../app-config.service';
import { BaseDataService } from './base-data.service';
import { InfoPage, ShopContactInfo } from 'src/app/models/interfaces/info-pages';

@Injectable({
  providedIn: 'root',
})
export class InfoPageDataService extends BaseDataService {
  public baseUrl = 'infoPages';

  constructor(
    public readonly http: HttpClient,
    private _appConfigService: AppConfigService
  ) {
    super(_appConfigService);
  }

  public getAll(): Observable<InfoPage[]> {
    return this.http.get<InfoPage[]>(this.getUrl(), this.defaultHttpOptions);
  }

  public getByKey(key: string): Observable<InfoPage> {
    return this.http.get<InfoPage>(this.getUrl(key), this.defaultHttpOptions);
  }

  public update(model: InfoPage): Observable<InfoPage> {
    return this.http.put<InfoPage>(
      this.getUrl(),
      model,
      this.defaultHttpOptions
    );
  }

  public getContacts(): Observable<ShopContactInfo> {
    return this.http.get<ShopContactInfo>(
      this.getUrl('contacts'),
      this.defaultHttpOptions
    );
  }

  public updateContacts(model: ShopContactInfo): Observable<ShopContactInfo> {
    return this.http.put<ShopContactInfo>(
      this.getUrl('contacts'),
      model,
      this.defaultHttpOptions
    );
  }
}
