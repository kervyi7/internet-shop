import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../app-config.service';
import { BaseDataService } from './base-data.service';
import { Banner } from 'src/app/models/interfaces/banner';

@Injectable({
  providedIn: 'root',
})
export class BannerDataService extends BaseDataService {
  public baseUrl = 'banners';

  constructor(
    public readonly http: HttpClient,
    private _appConfigService: AppConfigService
  ) {
    super(_appConfigService);
  }

  public getAll(): Observable<Banner[]> {
    return this.http.get<Banner[]>(this.getUrl(), this.defaultHttpOptions);
  }
}
