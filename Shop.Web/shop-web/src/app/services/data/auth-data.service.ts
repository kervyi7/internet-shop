import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { BaseDataService } from "./base-data.service";
import { AppConfigService } from "../app-config.service";
import { ILogin } from "../../models/interfaces/login";
import { IAuthResponse } from "../../models/interfaces/auth-response";
import { IToken } from "../../models/interfaces/token";

@Injectable({
  providedIn: 'root'
})
export class AuthDataService extends BaseDataService {
  public baseUrl = 'auth';

  constructor(private readonly _http: HttpClient,
    private _appConfigService: AppConfigService) {
    super(_appConfigService);
  }

  public login(value: ILogin): Observable<IAuthResponse> {
    return this._http.post<IAuthResponse>(this.getUrl("login"), value, this.defaultHttpOptions);
  }

  public logout(): Observable<void> {
    return this._http.get<void>(this.getUrl("logout"), this.defaultHttpOptions);
  }

  public refresh(accessToken: string, refreshToken: string): Observable<IToken> {
    const body: IToken = { accessToken, refreshToken };
    return this._http.post<IToken>("refresh", body);
  }
}