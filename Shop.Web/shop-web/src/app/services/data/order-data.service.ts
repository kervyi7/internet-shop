import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseDataService } from './base-data.service';
import { AppConfigService } from '../app-config.service';
import { Order } from 'src/app/models/interfaces/order';
import { IBaseModel } from 'src/app/models/interfaces/base/base-model';

@Injectable({ providedIn: 'root' })
export class OrderDataService extends BaseDataService {
  public baseUrl = 'orders';

  constructor(
    public readonly http: HttpClient,
    private _appConfigService: AppConfigService
  ) {
    super(_appConfigService);
  }

  public create(order: Order): Observable<IBaseModel> {
    return this.http.post(this.getUrl(), order);
  }
}
