import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserGuard {
  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) { }

  public canActivate(): boolean {
    if (this._authService.isLoggedIn()) {
      return true;
    }
    this._router.navigate(['/not-found']);
    return false;
  }
}