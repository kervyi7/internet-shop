import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { BaseDataService } from "./base-data.service";
import { AppConfigService } from "../app-config.service";
import { ILogin } from "../../models/interfaces/login";
import { IAuthResponse } from "../../models/interfaces/auth-response";

@Injectable({
  providedIn: 'root'
})
export class AuthDataService extends BaseDataService {
  public baseUrl = 'auth';

  constructor(public readonly http: HttpClient,
    appConfigService: AppConfigService) {
    super(appConfigService);
  }

  public login(value: ILogin): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(this.getUrl(`${this.baseUrl}/login`), value, this.defaultHttpOptions);
  }

  public logout(): Observable<void> {
    return this.http.get<void>(this.getUrl(`${this.baseUrl}/logout`), this.defaultHttpOptions);
  }
}