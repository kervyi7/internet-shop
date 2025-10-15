import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../app-config.service';
import { BaseDataService } from '../base-data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShippingOption } from 'src/app/models/interfaces/shipping-option';

@Injectable({
  providedIn: 'root',
})
export class AdminShippingDataService extends BaseDataService {
  public baseUrl = 'adminShipping';

  constructor(
    public readonly http: HttpClient,
    private _appConfigService: AppConfigService
  ) {
    super(_appConfigService);
  }

  public getAll(): Observable<ShippingOption[]> {
    return this.http.get<ShippingOption[]>(this.getUrl(), this.defaultHttpOptions);
  }

  public create(option: ShippingOption): Observable<ShippingOption> {
    return this.http.post<ShippingOption>(this.getUrl(), option, this.defaultHttpOptions);
  }

  public update(option: ShippingOption): Observable<ShippingOption> {
    return this.http.put<ShippingOption>(this.getUrlById(option.id), option, this.defaultHttpOptions);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(this.getUrlById(id), this.defaultHttpOptions);
  }
}
