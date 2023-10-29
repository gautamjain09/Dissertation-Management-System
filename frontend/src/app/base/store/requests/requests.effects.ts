import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.model';
import {
  loadChangeRequestForIdAction,
  loadChangeRequestForIdIfNeededAction,
  loadChangeRequestsAction,
  loadChangeRequestsIfNeededAction,
  loadClarificationRequestForIdAction,
  loadClarificationRequestForIdIfNeededAction,
  loadClarificationRequestsAction,
  loadClarificationRequestsIfNeededAction,
  loadRequestsFailedAction,
  loadRequestsSuccessAction,
  loadRequestSuccessAction
} from './requests.actions';
import { mergeIfNil } from '../../../core/tools/If-needed-only-functions';
import { RequestsApiService } from '../../services/api/requests-api.service';
import {
  selectChangeRequestForId,
  selectChangeRequestsForKey,
  selectClarificationRequestForId,
  selectClarificationRequestsForKey
} from './requests.selectors';
import { RequestsStateKey } from './requests.state';
import { throttleWithSelector } from '../../../core/tools/throttle';


@Injectable()
export class RequestsEffects {

  loadClarificationRequestsIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadClarificationRequestsIfNeededAction), throttleWithSelector(({ key }) => key),
    mergeIfNil(({ key }) => this.store.select(selectClarificationRequestsForKey, key)),
    map(({ key, options }) => loadClarificationRequestsAction({ key, options }))
  ));

  loadClarificationRequestsAction = createEffect(() => this.actions.pipe(
    ofType(loadClarificationRequestsAction),
    mergeMap(({ key, options }) =>
      this.requestsApiService.getClarificationRequests(options).pipe(
        map(collection => loadRequestsSuccessAction(
          { resourceType: RequestsStateKey.CLARIFICATION, collection, key })),
        catchError(error => of(loadRequestsFailedAction({ error })))
      ))
  ));

  loadClarificationRequestForIdIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadClarificationRequestForIdIfNeededAction), throttleWithSelector(({ id }) => id),
    mergeIfNil(({ id }) => this.store.select(selectClarificationRequestForId, id)),
    map(({ id }) => loadClarificationRequestForIdAction({ id }))
  ));

  loadClarificationRequestForIdAction = createEffect(() => this.actions.pipe(
    ofType(loadClarificationRequestForIdAction),
    mergeMap(({ id }) => this.requestsApiService.getClarificationRequestForId(id).pipe(
      map(instance => loadRequestSuccessAction(
        { resourceType: RequestsStateKey.CLARIFICATION, instance })),
      catchError(error => of(loadRequestsFailedAction({ error })))
    ))
  ));


  loadChangeRequestsIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadChangeRequestsIfNeededAction), throttleWithSelector(({ key }) => key),
    mergeIfNil(({ key }) => this.store.select(selectChangeRequestsForKey, key)),
    map(({ key, options }) => loadChangeRequestsAction({ key, options }))
  ));

  loadChangeRequestsAction = createEffect(() => this.actions.pipe(
    ofType(loadChangeRequestsAction),
    mergeMap(({ key, options }) =>
      this.requestsApiService.getChangeRequests(options).pipe(
        map(collection => loadRequestsSuccessAction(
          { resourceType: RequestsStateKey.CHANGE, collection, key })),
        catchError(error => of(loadRequestsFailedAction({ error })))
      ))
  ));

  loadChangeRequestForIdIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadChangeRequestForIdIfNeededAction), throttleWithSelector(({ id }) => id),
    mergeIfNil(({ id }) => this.store.select(selectChangeRequestForId, id)),
    map(({ id }) => loadChangeRequestForIdAction({ id }))
  ));

  loadChangeRequestForIdAction = createEffect(() => this.actions.pipe(
    ofType(loadChangeRequestForIdAction),
    mergeMap(({ id }) => this.requestsApiService.getChangeRequestForId(id).pipe(
      map(instance => loadRequestSuccessAction(
        { resourceType: RequestsStateKey.CHANGE, instance })),
      catchError(error => of(loadRequestsFailedAction({ error })))
    ))
  ));

  constructor(private readonly actions: Actions,
              private readonly store: Store<AppState>,
              private readonly requestsApiService: RequestsApiService) {
  }

}
