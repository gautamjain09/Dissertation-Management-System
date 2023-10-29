import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, first, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.model';
import { UserApiService } from '../../services/api/user-api.service';
import {
  loadCurrentUserAction,
  loadCurrentUserIfNeededAction,
  loadCurrentUserSuccessAction,
  loadEmployeeForIdAction,
  loadEmployeeForIdIfNeededAction,
  loadEmployeesAction,
  loadEmployeesIfNeededAction,
  loadStudentForIdAction,
  loadStudentForIdIfNeededAction,
  loadStudentsAction,
  loadStudentsIfNeededAction,
  loadUserFailedAction,
  loadUserStoreCollectionSuccessAction,
  loadUserStoreInstanceSuccessAction
} from './user.actions';
import {
  selectCurrentUser,
  selectEmployeeForId,
  selectEmployeesForKey,
  selectStudentForId,
  selectStudentsForKey
} from './user.selectors';
import { selectIsLoggedIn } from '../auth/auth.selectors';
import { UserStateKey } from './user.state';
import { throttleWithSelector } from '../../../core/tools/throttle';
import { mergeIfNil } from '../../../core/tools/If-needed-only-functions';


@Injectable()
export class UserEffects {

  loadCurrentUserIfNeeded = createEffect(() => this.actions.pipe(
    ofType(loadCurrentUserIfNeededAction), throttleWithSelector(),
    mergeIfNil(() => this.store.select(selectCurrentUser)),
    map(() => loadCurrentUserAction())
  ));

  loadCurrentUser = createEffect(() => this.actions.pipe(
    ofType(loadCurrentUserAction),
    mergeMap(() => this.store.select(selectIsLoggedIn).pipe(
      first(),
      mergeMap(isLoggedIn => !isLoggedIn
        ? [loadUserFailedAction({ error: new Error('User is not logged in') })]
        : this.userService.getCurrentUser().pipe(
          map(user => loadCurrentUserSuccessAction({ user })),
          catchError(error => of(loadUserFailedAction(error)))
        ))
    ))
  ));

  loadStudentsIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadStudentsIfNeededAction), throttleWithSelector(({ key }) => key),
    mergeIfNil(({ key }) => this.store.select(selectStudentsForKey, key)),
    map(({ key, options }) => loadStudentsAction({ key, options }))
  ));

  loadStudentsAction = createEffect(() => this.actions.pipe(
    ofType(loadStudentsAction),
    mergeMap(({ key, options }) => this.userService.getStudents(options).pipe(
      map(collection => loadUserStoreCollectionSuccessAction(
        { resourceType: UserStateKey.STUDENT, collection, key }
      )),
      catchError(error => of(loadUserFailedAction({ error })))
    ))
  ));

  loadStudentForIdIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadStudentForIdIfNeededAction), throttleWithSelector(({ id }) => id),
    mergeIfNil(({ id }) => this.store.select(selectStudentForId, id)),
    map(({ id }) => loadStudentForIdAction({ id }))
  ));

  loadStudentForIdAction = createEffect(() => this.actions.pipe(
    ofType(loadStudentForIdAction),
    mergeMap(({ id }) => this.userService.getStudentForId(id).pipe(
      map(instance => loadUserStoreInstanceSuccessAction(
        { resourceType: UserStateKey.STUDENT, instance }
      )),
      catchError(error => of(loadUserFailedAction({ error })))
    ))
  ));

  loadEmployeesIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadEmployeesIfNeededAction), throttleWithSelector(({ key }) => key),
    mergeIfNil(({ key }) => this.store.select(selectEmployeesForKey, key)),
    map(({ key, options }) => loadEmployeesAction({ key, options }))
  ));

  loadEmployeesAction = createEffect(() => this.actions.pipe(
    ofType(loadEmployeesAction),
    mergeMap(({ key, options }) =>
      this.userService.getEmployees(options).pipe(
        map(collection => loadUserStoreCollectionSuccessAction(
          { resourceType: UserStateKey.EMPLOYEE, collection, key }
        )),
        catchError(error => of(loadUserFailedAction({ error })))
      ))
  ));

  loadEmployeeForIdIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadEmployeeForIdIfNeededAction), throttleWithSelector(({ id }) => id),
    mergeIfNil(({ id }) => this.store.select(selectEmployeeForId, id)),
    map(({ id }) => loadEmployeeForIdAction({ id }))
  ));

  loadEmployeeForIdAction = createEffect(() => this.actions.pipe(
    ofType(loadEmployeeForIdAction),
    mergeMap(({ id }) => this.userService.getEmployeeForId(id).pipe(
      map(instance => loadUserStoreInstanceSuccessAction(
        { resourceType: UserStateKey.EMPLOYEE, instance }
      )),
      catchError(error => of(loadUserFailedAction({ error })))
    ))
  ));


  constructor(private readonly actions: Actions,
              private readonly store: Store<AppState>,
              private readonly userService: UserApiService) {
  }

}
