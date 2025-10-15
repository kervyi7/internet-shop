import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from '../app-config.service';
import { BaseDataService } from './base-data.service';
import { DeliveryAddress } from 'src/app/models/interfaces/delivery-address';

@Injectable({ providedIn: 'root' })
export class DeliveryAddressDataService extends BaseDataService {
  public baseUrl = 'deliveryaddress';

  constructor(
    public readonly http: HttpClient,
    private _appConfigService: AppConfigService
  ) {
    super(_appConfigService);
  }

  public getAll(userId: string): Observable<DeliveryAddress[]> {
    return this.http.get<DeliveryAddress[]>(
      this.getUrl(userId),
      this.defaultHttpOptions
    );
  }

  public add(model: DeliveryAddress): Observable<DeliveryAddress> {
    return this.http.post<DeliveryAddress>(
      this.getUrl(),
      model,
      this.defaultHttpOptions
    );
  }

  public update(
    id: number,
    model: DeliveryAddress
  ): Observable<DeliveryAddress> {
    return this.http.put<DeliveryAddress>(
      this.getUrl(`${id}`),
      model,
      this.defaultHttpOptions
    );
  }

  public delete(id: number, userId: string): Observable<void> {
    return this.http.delete<void>(
      this.getUrl(`${id}/${userId}`),
      this.defaultHttpOptions
    );
  }
}
