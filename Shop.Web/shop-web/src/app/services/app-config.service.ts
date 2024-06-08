import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { IAppConfig } from '../models/interfaces/app-config';
import { ILocalization } from '../models/interfaces/localization/localization';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private _config: IAppConfig;
  private _apiUrl: string;
  private _appHost: string;
  private _localization: ILocalization;

  get apiUrl(): string {
    return this._apiUrl;
  }

  get appHost(): string {
    return this._appHost;
  }

  get config(): IAppConfig {
    return this._config;
  }

  get localization(): ILocalization {
    return this._localization;
  }

  set localization(value: ILocalization) {
    this._localization = value;
  }

  constructor(
    private _http: HttpClient
  ) {
    this.init();
  }

  public async load(): Promise<void> {
    await this.loadLocalization();
  }

  public async loadLocalization(): Promise<void> {
    const type = this.getLocalizationType();
    const result = await firstValueFrom<ILocalization>(this._http.get<ILocalization>(`${this._apiUrl}/appSettings/localization/${type}`));
    this.localization = result;
  }

  private getLocalizationType(): string {
    return 'en';//todo local storage
  }

  private init(): void {
    if (isDevMode()) {
      this._appHost = 'http://localhost:5000';
    } else {
      this._appHost = window.location.origin;
    }
    this._apiUrl = `${this._appHost}/api`;
  }
}
