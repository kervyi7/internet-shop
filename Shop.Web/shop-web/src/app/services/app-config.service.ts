import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { IAppConfig } from '../models/interfaces/app-config';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private _config: IAppConfig;
  private _apiUrl: string;
  private _appHost: string;

  get apiUrl(): string {
    return this._apiUrl;
  }

  get appHost(): string {
    return this._appHost;
  }

  get config(): IAppConfig {
    return this._config;
  }

  constructor(
    private _http: HttpClient
  ) {
    this.init();
  }

  // public load(): Promise<boolean> {
  // 	return new Promise((resolve) => {
  // 		this._http.get(`${this._apiUrl}app-settings`).subscribe(
  // 			(data: IAppConfig) => {
  // 				this._config = data;
  // 				resolve(true);
  // 			},
  // 			error => {
  // 				resolve(true);
  // 				return throwError(error);
  // 			}
  // 		);
  // 	});
  // }

  private init(): void {
    if (isDevMode()) {
      this._appHost = 'http://localhost:5000';
    } else {
      this._appHost = window.location.origin;
    }
    this._apiUrl = `${this._appHost}/api`;
  }
}
