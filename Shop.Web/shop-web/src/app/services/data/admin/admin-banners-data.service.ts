import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Banner, BannerUpdate } from 'src/app/models/interfaces/banner';
import { AppConfigService } from '../../app-config.service';
import { BaseDataService } from '../base-data.service';

@Injectable({
  providedIn: 'root',
})
export class AdminBannerDataService extends BaseDataService {
  public baseUrl = 'adminBanners';

  constructor(
    public readonly http: HttpClient,
    private _appConfigService: AppConfigService
  ) {
    super(_appConfigService);
  }

  public getAll(): Observable<Banner[]> {
    return this.http.get<Banner[]>(this.getUrl(), this.defaultHttpOptions);
  }

  public update(model: BannerUpdate): Observable<Banner> {
    return this.http.put<Banner>(this.getUrl(), model, this.defaultHttpOptions);
  }
}
