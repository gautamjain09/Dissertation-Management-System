import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.model';
import {
  loadReservationForIdAction,
  loadReservationForIdIfNeededAction,
  loadReservationsAction,
  loadStudentReservationsIfNeededAction,
  loadThesesAction,
  loadThesesFailedAction,
  loadThesesIfNeededAction,
  loadThesesStoreCollectionSuccessAction,
  loadThesisForIdAction,
  loadThesisForIdIfNeededAction,
  loadThesisStoreInstanceSuccessAction
} from './theses.actions';
import { mergeIfNil } from '../../../core/tools/If-needed-only-functions';
import {
  selectReservationForId,
  selectReservationsForKey,
  selectThesesForKey,
  selectThesisForId
} from './theses.selectors';
import { ThesesStateKey } from './theses.state';
import { ThesesApiService } from '../../services/api/theses-api.service';
import { throttleWithSelector } from '../../../core/tools/throttle';


@Injectable()
export class ThesesEffects {

  loadThesesIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadThesesIfNeededAction), throttleWithSelector(({ key }) => key),
    mergeIfNil(({ key }) => this.store.select(selectThesesForKey, key)),
    map(({ options, key }) => loadThesesAction({ options, key }))
  ));

  loadThesesAction = createEffect(() => this.actions.pipe(
    ofType(loadThesesAction),
    mergeMap(({ options, key }) =>
      this.thesesApiService.getThesesForUserRole(options).pipe(
        map(collection => loadThesesStoreCollectionSuccessAction(
          { resourceType: ThesesStateKey.THESES, collection, key })),
        catchError(error => of(loadThesesFailedAction({ error })))
      ))
  ));

  loadThesisForIdIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadThesisForIdIfNeededAction), throttleWithSelector(({ id }) => id),
    mergeIfNil(({ id }) => this.store.select(selectThesisForId, id)),
    map(({ id }) => loadThesisForIdAction({ id }))
  ));

  loadThesisForIdAction = createEffect(() => this.actions.pipe(
    ofType(loadThesisForIdAction),
    mergeMap(({ id }) => this.thesesApiService.getThesisForId(id).pipe(
      map(instance => loadThesisStoreInstanceSuccessAction(
        { resourceType: ThesesStateKey.THESES, instance }
      )),
      catchError(error => of(loadThesesFailedAction({ error })))
    ))
  ));

  loadStudentReservationsIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadStudentReservationsIfNeededAction), throttleWithSelector(({ key }) => key),
    mergeIfNil(({ key }) => this.store.select(selectReservationsForKey, key)),
    map(({ key, options }) => loadReservationsAction({ key, options }))
  ));

  loadRequestsAction = createEffect(() => this.actions.pipe(
    ofType(loadReservationsAction),
    mergeMap(({ key, options }) =>
      this.thesesApiService.getStudentReservations(options).pipe(
        map(collection => loadThesesStoreCollectionSuccessAction(
          { resourceType: ThesesStateKey.RESERVATIONS, collection, key }
        )),
        catchError(error => of(loadThesesFailedAction({ error })))
      ))
  ));

  loadReservationForIdIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadReservationForIdIfNeededAction), throttleWithSelector(({ id }) => id),
    mergeIfNil(({ id }) => this.store.select(selectReservationForId, id)),
    map(({ id }) => loadReservationForIdAction({ id }))
  ));

  loadReservationForIdAction = createEffect(() => this.actions.pipe(
    ofType(loadReservationForIdAction),
    mergeMap(({ id }) => this.thesesApiService.getReservationForId(id).pipe(
      map(instance => loadThesisStoreInstanceSuccessAction(
        { resourceType: ThesesStateKey.RESERVATIONS, instance }
      )),
      catchError(error => of(loadThesesFailedAction({ error })))
    ))
  ));

  constructor(private readonly actions: Actions,
              private readonly store: Store<AppState>,
              private readonly thesesApiService: ThesesApiService) {
  }

}
