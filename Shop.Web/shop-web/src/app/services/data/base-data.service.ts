import { HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '../app-config.service';
import { IHttpOptions } from '../../models/interfaces/http-options';

export abstract class BaseDataService {
  private _apiUrl: string;
  public abstract baseUrl: string;
  public defaultHttpOptions: IHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  get apiUrl(): string {
    return this._apiUrl;
  }

  constructor(protected appConfigService: AppConfigService) {
    this._apiUrl = this.appConfigService.apiUrl;
  }

  public getUrl(...endpoints: string[]): string {
    let url = `${this.apiUrl}/${this.baseUrl}`
    for (const endpoint of endpoints) {
      url += `/${endpoint}`
    }
    return url;
  }

  public getUrlById(id: number | string): string {
    return `${this.apiUrl}/${this.baseUrl}/${id}`;
  }
}