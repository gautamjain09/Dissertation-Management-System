import { Injectable } from '@angular/core';
import { Selector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app-state.model';
import { CleanableStoreService } from '../../../core/services/cleanable-store.service';
import {
  invalidateRequestsDataAction,
  loadChangeRequestForIdAction,
  loadChangeRequestForIdIfNeededAction,
  loadChangeRequestsAction,
  LoadChangeRequestsActionOptions,
  loadChangeRequestsIfNeededAction,
  loadClarificationRequestForIdAction,
  loadClarificationRequestForIdIfNeededAction,
  loadClarificationRequestsAction,
  LoadClarificationRequestsActionOptions,
  loadClarificationRequestsIfNeededAction
} from '../../store/requests/requests.actions';
import {
  selectChangeRequestForId,
  selectChangeRequestsForKey,
  selectClarificationRequestForId,
  selectClarificationRequestsForKey,
  selectRequestsStateError,
  selectRequestsStateInProgress
} from '../../store/requests/requests.selectors';
import { RequestsStateKey } from '../../store/requests/requests.state';
import { ClarificationRequest } from '../../models/dto/clarification-request.model';
import { ChangeRequest } from '../../models/dto/change-request.model';
import { filterExists } from '../../../core/tools/filter-exists';
import { IdType } from '../../models/dto/id.model';

@Injectable({
  providedIn: 'root'
})
export class RequestsStoreService extends CleanableStoreService {

  constructor(store: Store<AppState>) {
    super(store);
  }

  public getChangeRequests(options: LoadChangeRequestsActionOptions, ifNeededOnly = true)
    : Observable<ChangeRequest[]> {
    const key = options.toKey();
    this.loadChangeRequests(options, key, ifNeededOnly);
    return this.selectChangeRequestsForKey(key).pipe(filterExists());
  }

  public getClarificationRequests(options: LoadClarificationRequestsActionOptions, ifNeededOnly = true)
    : Observable<ClarificationRequest[]> {
    const key = options.toKey();
    this.loadClarificationRequests(options, key, ifNeededOnly);
    return this.selectClarificationRequestsForKey(key).pipe(filterExists());
  }

  public getChangeRequestForId(requestId: IdType, ifNeededOnly = true)
    : Observable<ChangeRequest> {
    this.loadChangeRequestForId(requestId, ifNeededOnly);
    return this.selectChangeRequestForId(requestId).pipe(filterExists());
  }

  public getClarificationRequestForId(requestId: IdType, ifNeededOnly = true)
    : Observable<ClarificationRequest> {
    this.loadClarificationRequestForId(requestId, ifNeededOnly);
    return this.selectClarificationRequestForId(requestId).pipe(filterExists());
  }

  public loadClarificationRequests(options: LoadClarificationRequestsActionOptions, key: string, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadClarificationRequestsIfNeededAction({ options, key })
      : loadClarificationRequestsAction({ options, key });
    this.store.dispatch(action);
  }

  public loadChangeRequests(options: LoadChangeRequestsActionOptions, key: string, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadChangeRequestsIfNeededAction({ options, key })
      : loadChangeRequestsAction({ options, key });
    this.store.dispatch(action);
  }

  public loadClarificationRequestForId(id: IdType, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadClarificationRequestForIdIfNeededAction({ id })
      : loadClarificationRequestForIdAction({ id });
    this.store.dispatch(action);
  }

  public loadChangeRequestForId(id: IdType, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadChangeRequestForIdIfNeededAction({ id })
      : loadChangeRequestForIdAction({ id });
    this.store.dispatch(action);
  }

  public invalidateStoreForType(resourceType: RequestsStateKey): void {
    this.store.dispatch(invalidateRequestsDataAction({ resourceType }));
  }

  public selectClarificationRequestsForKey(key: string): Observable<ClarificationRequest[] | undefined> {
    return this.store.select(selectClarificationRequestsForKey, key);
  }

  public selectClarificationRequestForId(id: IdType): Observable<ClarificationRequest | undefined> {
    return this.store.select(selectClarificationRequestForId, id);
  }

  public selectChangeRequestsForKey(key: string): Observable<ChangeRequest[] | undefined> {
    return this.store.select(selectChangeRequestsForKey, key);
  }

  public selectChangeRequestForId(id: IdType): Observable<ChangeRequest | undefined> {
    return this.store.select(selectChangeRequestForId, id);
  }


  public selectStateError(): Observable<any> {
    return this.store.select(selectRequestsStateError);
  }

  public getProgressSelector(): Selector<AppState, boolean> {
    return selectRequestsStateInProgress;
  }

}
