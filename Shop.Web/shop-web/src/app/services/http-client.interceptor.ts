import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router, RouterStateSnapshot } from "@angular/router";
import { Observable, Subscriber } from "rxjs";
import { ICallerRequest } from "../models/interfaces/caller-request";
import { AuthService } from "./auth.service";
import { AuthDataService } from "./data/auth-data.service";
import { IToken } from "../models/interfaces/token";

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  private refreshInProgress = false;
  private callerRequests: ICallerRequest[] = [];

  public constructor(
    private _authService: AuthService,
    private _httpClient: HttpClient,
    private _router: Router,
    private _authDataService: AuthDataService
  ) { }

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const request = this.cloneHttpRequest(req);
    const observable = new Observable<HttpEvent<unknown>>((subscriber) => {
      const originalRequestSubscription = next.handle(request)
        .subscribe({
          next: (response: HttpEvent<unknown>) => subscriber.next(response),
          error: (errorResponse: HttpErrorResponse) => this.handleError(errorResponse, subscriber, request),
          complete: () => subscriber.complete()
        });
      return () => originalRequestSubscription.unsubscribe();
    });
    return observable;
  }

  private cloneHttpRequest(req: HttpRequest<unknown>): HttpRequest<unknown> {
    const token = this._authService.getToken();
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handleError(errorResponse: HttpErrorResponse, subscriber: Subscriber<unknown>, httpRequest: HttpRequest<unknown>) {
    if (errorResponse.status === 401) {
      const tokenExpired = errorResponse.headers.get("Token-Expired");
      if (tokenExpired === "true") {
        this.handleTokenExpiredError(subscriber, httpRequest);
      } else {
        subscriber.complete();
        this._router.navigate(['/not-found']);
      }
      return;
    }
    if (errorResponse.status === 404) {
      subscriber.complete();
      this._router.navigate(['/not-found']);
      return;
    }
    subscriber.error(errorResponse);

  }

  private handleTokenExpiredError(subscriber: Subscriber<unknown>, request: HttpRequest<unknown>) {
    this.callerRequests.push({ subscriber: subscriber, failedRequest: request });
    if (this.refreshInProgress) {
      return;
    }
    this.refresh();
  }

  private refresh() {
    const token = this._authService.getToken();
    const refreshToken = this._authService.getRefreshToken();
    if (!token || !refreshToken) {
      this.processingFailureRefresh();
      return;
    }
    this.refreshInProgress = true;
    this._authService.removeTokenInfo();
    this._authDataService.refresh(token, refreshToken)
      .subscribe({
        next: (token: IToken) => {
          this.refreshInProgress = false;
          this._authService.setToken(token);
          this.repeatFailedRequests();
        },
        error: () => this.processingFailureRefresh()
      });
  }

  private processingFailureRefresh(): void {
    this.redirectToLogin();
    this.refreshInProgress = false;
    this.callerRequests.forEach((item) => {
      item.subscriber.complete();
    });
    this.callerRequests = [];
  }

  private repeatFailedRequests() {
    this.callerRequests.forEach((item) => {
      this.repeatRequest(item.failedRequest, item.subscriber);
    });
    this.callerRequests = [];
  }

  private repeatRequest(failedRequest: HttpRequest<unknown>, subscriber: Subscriber<unknown>) {
    this._httpClient.request(failedRequest)
      .subscribe({
        next: (response) => {
          subscriber.next(response);
        },
        error: (errorResponse: HttpErrorResponse) => subscriber.error(errorResponse),
        complete: () => subscriber.complete()
      });
  }

  private redirectToLogin(): void {
    const routerStateSnapshot: RouterStateSnapshot = this._router.routerState.snapshot;
    this._router.navigate(['/login'], { queryParams: { returnUrl: routerStateSnapshot.url } });
  }
}
