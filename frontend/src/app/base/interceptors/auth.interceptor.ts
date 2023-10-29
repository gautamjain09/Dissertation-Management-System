import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, throwError } from 'rxjs';
import { AuthStoreService } from '../services/store/auth-store.service';
import { filterNotInProgress } from '../../core/tools/filter-not-in-progress';
import { catchError, first, map, tap } from 'rxjs/operators';
import { isNil } from 'lodash-es';
import { isNotNil } from '../../core/tools/is-not-nil';
import { SettingsService } from '../../core/services/settings.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly authStoreService: AuthStoreService,
              private readonly settingsService: SettingsService) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isAuthRequest(request)) {
      return next.handle(request);
    }

    return this.addToken(request, next).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(error, request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private isAuthRequest(request: HttpRequest<any>): boolean {
    return request.url.startsWith(this.settingsService.serverConfig.authBase);
  }

  private handle401Error(error: HttpErrorResponse, request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authStoreService.selectStoreProgress().pipe(
      first(),
      tap(inProgress => !inProgress && this.authStoreService.refresh()),
      switchMap(() => this.getAccessToken()),
      switchMap(token => {
        if (isNotNil(token)) {
          return next.handle(this.addTokenHeader(request, token!));
        }
        return throwError(() => error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.getAccessToken().pipe(
      map(accessToken => isNil(accessToken) ? request : this.addTokenHeader(request, accessToken)),
      switchMap(finalRequest => next.handle(finalRequest))
    );
  }

  private getAccessToken(): Observable<string | undefined> {
    return this.authStoreService.getAuthState().pipe(
      filterNotInProgress(),
      first(),
      map(state => isNil(state?.error) ? state?.authData : undefined),
      map(authData => authData?.accessToken)
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
