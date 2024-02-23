import { Injectable } from "@angular/core";
import { IToken } from "../models/interfaces/token";
import { Constants } from "../common/constants";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public getToken(): string | null {
    return localStorage.getItem(Constants.X_AUTH_TOKEN_LABEL);
  }
  public setToken(token: IToken): void {
    localStorage.setItem(Constants.X_AUTH_TOKEN_LABEL, token.accessToken);
    localStorage.setItem(Constants.X_REFRESH_TOKEN_LABEL, token.refreshToken);
  }

  private removeTokenInfo(): void {
    localStorage.removeItem(Constants.X_AUTH_TOKEN_LABEL);
    localStorage.removeItem(Constants.X_REFRESH_TOKEN_LABEL);
  }
}