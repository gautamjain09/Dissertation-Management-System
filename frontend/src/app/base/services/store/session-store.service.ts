import { Injectable } from '@angular/core';
import { Selector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app-state.model';
import { UserRole } from '../../models/dto/user-role.model';
import { CleanableStoreService } from '../../../core/services/cleanable-store.service';
import {
  selectSessionContext,
  selectSessionContextDiplomaSession,
  selectSessionContextRole,
  selectSessionLanguage,
  selectSessionStateError,
  selectSessionStateInProgress
} from '../../store/session/session.selectors';
import { setContext, setLanguageAction, setLanguageIfNeededAction } from '../../store/session/session.actions';
import { AppLanguage } from '../../../core/models/app-language.model';
import { filterExists } from '../../../core/tools/filter-exists';
import { SettingsService } from '../../../core/services/settings.service';
import { Context } from '../../models/context.model';
import { DiplomaSession } from '../../models/dto/diploma-session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionStoreService extends CleanableStoreService {

  constructor(private readonly settingsService: SettingsService,
              store: Store<AppState>) {
    super(store);
  }

  public getLanguage(): Observable<AppLanguage> {
    const defaultLang = this.settingsService.getDefaultLanguage();
    this.setLanguageIfNeeded(defaultLang);
    return this.selectSessionLanguage().pipe(filterExists());
  }

  public setContext(context?: Context): void {
    this.store.dispatch(setContext({ context: context }));
  }

  public setLanguageIfNeeded(language: AppLanguage): void {
    this.store.dispatch(setLanguageIfNeededAction({ language }));
  }

  public setLanguage(language: AppLanguage): void {
    this.store.dispatch(setLanguageAction({ language }));
  }

  public selectSessionContext(): Observable<Context | undefined> {
    return this.store.select(selectSessionContext);
  }

  public selectSessionContextRole(): Observable<UserRole | undefined> {
    return this.store.select(selectSessionContextRole);
  }

  public selectSessionContextDiplomaSession(): Observable<DiplomaSession | undefined> {
    return this.store.select(selectSessionContextDiplomaSession);
  }

  public selectSessionLanguage(): Observable<AppLanguage | undefined> {
    return this.store.select(selectSessionLanguage);
  }

  public selectError(): Observable<any> {
    return this.store.select(selectSessionStateError);
  }

  protected getProgressSelector(): Selector<AppState, boolean> {
    return selectSessionStateInProgress;
  }

}
