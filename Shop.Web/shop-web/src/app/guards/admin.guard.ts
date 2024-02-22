import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  public canActivate(): boolean {
    return false;
  }
}