import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from '../../app-config.service';
import { BaseDataService } from '../base-data.service';
import { Order } from 'src/app/models/interfaces/order';
import { OrderRequest } from 'src/app/models/interfaces/filters';
import { IPageData } from 'src/app/models/interfaces/page-data';

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

  public getAll(request: OrderRequest): Observable<IPageData<Order[]>> {
    return this.http.post<IPageData<Order[]>>(this.getUrl('list'), request, this.defaultHttpOptions);
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
