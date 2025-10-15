import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from '../app-config.service';
import { BaseDataService } from './base-data.service';
import { ShippingOption } from 'src/app/models/interfaces/shipping-option';

@Injectable({ providedIn: 'root' })
export class ShippingDataService extends BaseDataService {
  public baseUrl = 'shipping';

  constructor(
    public readonly http: HttpClient,
    private _appConfigService: AppConfigService
  ) {
    super(_appConfigService);
  }

  public getAll(): Observable<ShippingOption[]> {
    return this.http.get<ShippingOption[]>(
      this.getUrl(),
      this.defaultHttpOptions
    );
  }
}
