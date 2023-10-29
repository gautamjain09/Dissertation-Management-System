import { Injectable } from '@angular/core';
import { Selector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthData } from '../../models/auth-data.model';
import {
  selectAuthData,
  selectAuthError,
  selectAuthState,
  selectAuthStoreInProgress,
  selectIsLoggedIn
} from '../../store/auth/auth.selectors';
import { LoginData } from '../../models/login-data.model';
import { loginAction, logoutAction, refreshTokenAction } from '../../store/auth/auth.actions';
import { AppState } from '../../store/app-state.model';
import { CleanableStoreService } from '../../../core/services/cleanable-store.service';
import { AuthState } from '../../store/auth/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService extends CleanableStoreService {

  constructor(store: Store<AppState>) {
    super(store);
  }

  public getProgressSelector(): Selector<AppState, boolean> {
    return selectAuthStoreInProgress;
  }

  public login(loginData: LoginData): void {
    this.store.dispatch(loginAction({ loginData }));
  }

  public refresh(): void {
    this.store.dispatch(refreshTokenAction());
  }

  public logout(): void {
    this.store.dispatch(logoutAction());
  }

  public isUserLoggedIn(): Observable<boolean> {
    return this.store.select(selectIsLoggedIn);
  }

  public getAuthState(): Observable<AuthState | undefined> {
    return this.store.select(selectAuthState);
  }

  public getAuthData(): Observable<AuthData | undefined> {
    return this.store.select(selectAuthData);
  }

  public getError(): Observable<any> {
    return this.store.select(selectAuthError);
  }

}
