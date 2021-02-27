import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, pipe, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from "rxjs/operators";
import { RefreshService } from "../services/authentication/refresh.service";
import { UserService } from "../services/authentication/user.service";

@Injectable({
    providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    constructor(
        private _refreshService: RefreshService,
        private _userService: UserService)
    {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                console.log("401 error!")
                return this.handle401Error(request, next);
            } else {
                return throwError(error);
            }
        }));
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
        
            return this._refreshService.refreshToken().pipe(
            switchMap((token: any) => {
                this.isRefreshing = false;
                this.refreshTokenSubject.next(token.jwt);
                return next.handle(this.updateHeader(request));
            }));
        
        } else {
            return this.refreshTokenSubject.pipe(
            filter(token => token != null),
            take(1),
            switchMap(jwt => {
                return next.handle(this.updateHeader(request));
            }));
        }
    }

    updateHeader(req: HttpRequest<any>) {
        const authToken = this._userService.getAccessToken();
        req = req.clone({
          headers: req.headers.set("Authorization", `Bearer ${authToken}`)
        });
        return req;
      }
}