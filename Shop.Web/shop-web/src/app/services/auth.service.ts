import { Injectable } from '@angular/core';
import { IToken } from '../models/interfaces/token';
import { Constants } from '../common/constants';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public getToken(): string | null {
    return localStorage.getItem(Constants.X_AUTH_TOKEN_LABEL);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(Constants.X_REFRESH_TOKEN_LABEL);
  }

  public setToken(token: IToken): void {
    localStorage.setItem(Constants.X_AUTH_TOKEN_LABEL, token.accessToken);
    localStorage.setItem(Constants.X_REFRESH_TOKEN_LABEL, token.refreshToken);
  }

  public removeTokenInfo(): void {
    localStorage.removeItem(Constants.X_AUTH_TOKEN_LABEL);
    localStorage.removeItem(Constants.X_REFRESH_TOKEN_LABEL);
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    return Boolean(token);
  }

  public isAdmin(): boolean {
    return this.getRole() === 'Administrator';
  }

  public getUserId(): string {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const decoded: any = jwtDecode(token);
    return decoded[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    ];
  }

  private getRole(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    const decoded: any = jwtDecode(token);
    return decoded[
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    ];
  }
}
