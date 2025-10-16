import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderStatuses } from 'src/app/models/enums/order-statuses';
import { IGetModelsRequest } from 'src/app/models/interfaces/get-models-request';
import { AppConfigService } from '../../app-config.service';
import { BaseDataService } from '../base-data.service';
import { Order } from 'src/app/models/interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderDataService extends BaseDataService {
  public baseUrl = 'adminOrder';

  constructor(
    public readonly http: HttpClient,
    private _appConfigService: AppConfigService
  ) {
    super(_appConfigService);
  }

  public getAll(pagination: IGetModelsRequest, status?: OrderStatuses): Observable<Order[]> {
    let url = this.getUrl('list');
    if (status !== undefined && status !== null) {
      url += `?status=${status}`;
    }
    return this.http.post<Order[]>(url, pagination, this.defaultHttpOptions);
  }

  public getExpired(): Observable<Order[]> {
    return this.http.get<Order[]>(this.getUrl('expired'), this.defaultHttpOptions);
  }

  public updateStatus(orderId: number, status: number): Observable<void> {
    return this.http.put<void>(
      `${this.getUrl(orderId.toString(), 'status')}`,
      { status },
      this.defaultHttpOptions
    );
  }

  public getById(orderId: number): Observable<Order> {
    return this.http.get<Order>(this.getUrl(orderId.toString()), this.defaultHttpOptions);
  }
}
