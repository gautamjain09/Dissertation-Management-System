import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.model';
import {
  selectDepartmentForId,
  selectDepartmentsForKey,
  selectDiplomaSessionForId,
  selectDiplomaSessionsForKey,
  selectFieldOfStudyForId,
  selectFieldsOfStudyForKey,
  selectTimetableForId,
  selectTimetablesForKey
} from './general.selectors';
import { mergeIfNil } from '../../../core/tools/If-needed-only-functions';
import {
  loadDepartmentForIdAction,
  loadDepartmentForIdIfNeededAction,
  loadDepartmentsAction,
  loadDepartmentsIfNeededAction,
  loadDiplomaSessionForIdAction,
  loadDiplomaSessionForIdIfNeededAction,
  loadDiplomaSessionsAction,
  loadDiplomaSessionsIfNeededAction,
  loadFieldOfStudyForIdAction,
  loadFieldOfStudyForIdIfNeededAction,
  loadFieldsOfStudyAction,
  loadFieldsOfStudyIfNeededAction,
  loadGeneralResourcesFailedAction,
  loadGeneralResourcesSuccessAction,
  loadGeneralResourceSuccessAction,
  loadTimetableForIdAction,
  loadTimetableForIdIfNeededAction,
  loadTimetablesAction,
  loadTimetablesIfNeededAction
} from './general.actions';
import { GeneralResourcesApiService } from '../../services/api/general-api.service';
import { GeneralResourcesStateKey } from './general.state';
import { throttleWithSelector } from '../../../core/tools/throttle';


@Injectable()
export class GeneralResourcesEffects {


  loadTimetablesIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadTimetablesIfNeededAction), throttleWithSelector(({ key }) => key),
    mergeIfNil(({ options, key }) => this.store.select(selectTimetablesForKey, key)),
    map(({ options, key }) => loadTimetablesAction({ options, key }))
  ));

  loadTimetablesAction = createEffect(() => this.actions.pipe(
    ofType(loadTimetablesAction),
    mergeMap(({ options, key }) => this.generalResourcesService.getTimetables(options).pipe(
      map(collection => loadGeneralResourcesSuccessAction(
        { resourceType: GeneralResourcesStateKey.TIMETABLES, collection, key }
      )),
      catchError(error => of(loadGeneralResourcesFailedAction({ error })))
    ))
  ));

  loadTimetableForIdIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadTimetableForIdIfNeededAction), throttleWithSelector(({ id }) => id),
    mergeIfNil(({ id }) => this.store.select(selectTimetableForId, id)),
    map(({ id }) => loadTimetableForIdAction({ id }))
  ));

  loadTimetableForIdAction = createEffect(() => this.actions.pipe(
    ofType(loadTimetableForIdAction),
    mergeMap(({ id }) => this.generalResourcesService.getTimetableForId(id).pipe(
      map(instance => loadGeneralResourceSuccessAction(
        { resourceType: GeneralResourcesStateKey.TIMETABLES, instance }
      )),
      catchError(error => of(loadGeneralResourcesFailedAction({ error })))
    ))
  ));

  loadDiplomaSessionsIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadDiplomaSessionsIfNeededAction), throttleWithSelector(({ key }) => key),
    mergeIfNil(({ options, key }) => this.store.select(selectDiplomaSessionsForKey, key)),
    map(({ options, key }) => loadDiplomaSessionsAction({ options, key }))
  ));

  loadDiplomaSessionsAction = createEffect(() => this.actions.pipe(
    ofType(loadDiplomaSessionsAction),
    mergeMap(({ options, key }) => this.generalResourcesService.getDiplomaSessions(options).pipe(
      map(collection => loadGeneralResourcesSuccessAction(
        { resourceType: GeneralResourcesStateKey.DIPLOMA_SESSIONS, collection, key }
      )),
      catchError(error => of(loadGeneralResourcesFailedAction({ error })))
    ))
  ));

  loadDiplomaSessionForIdIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadDiplomaSessionForIdIfNeededAction), throttleWithSelector(({ id }) => id),
    mergeIfNil(({ id }) => this.store.select(selectDiplomaSessionForId, id)),
    map(({ id }) => loadDiplomaSessionForIdAction({ id }))
  ));

  loadDiplomaSessionForIdAction = createEffect(() => this.actions.pipe(
    ofType(loadDiplomaSessionForIdAction),
    mergeMap(({ id }) => this.generalResourcesService.getDiplomaSessionForId(id).pipe(
      map(instance => loadGeneralResourceSuccessAction(
        { resourceType: GeneralResourcesStateKey.DIPLOMA_SESSIONS, instance }
      )),
      catchError(error => of(loadGeneralResourcesFailedAction({ error })))
    ))
  ));


  loadDepartmentsIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadDepartmentsIfNeededAction), throttleWithSelector(({ key }) => key),
    mergeIfNil(({ options, key }) => this.store.select(selectDepartmentsForKey, key)),
    map(({ options, key }) => loadDepartmentsAction({ options, key }))
  ));

  loadDepartmentsAction = createEffect(() => this.actions.pipe(
    ofType(loadDepartmentsAction),
    mergeMap(({ options, key }) => this.generalResourcesService.getDepartments(options).pipe(
      map(collection => loadGeneralResourcesSuccessAction(
        { resourceType: GeneralResourcesStateKey.DEPARTMENTS, collection, key })),
      catchError(error => of(loadGeneralResourcesFailedAction({ error })))
    ))
  ));

  loadDepartmentForIdIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadDepartmentForIdIfNeededAction), throttleWithSelector(({ id }) => id),
    mergeIfNil(({ id }) => this.store.select(selectDepartmentForId, id)),
    map(({ id }) => loadDepartmentForIdAction({ id }))
  ));

  loadDepartmentForIdAction = createEffect(() => this.actions.pipe(
    ofType(loadDepartmentForIdAction),
    mergeMap(({ id }) => this.generalResourcesService.getDepartmentForId(id).pipe(
      map(instance => loadGeneralResourceSuccessAction(
        { resourceType: GeneralResourcesStateKey.DEPARTMENTS, instance })),
      catchError(error => of(loadGeneralResourcesFailedAction({ error })))
    ))
  ));


  loadFieldsOfStudyIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadFieldsOfStudyIfNeededAction), throttleWithSelector(({ key }) => key),
    mergeIfNil(({ options, key }) => this.store.select(selectFieldsOfStudyForKey, key)),
    map(({ options, key }) => loadFieldsOfStudyAction({ options, key }))
  ));

  loadFieldsOfStudyAction = createEffect(() => this.actions.pipe(
    ofType(loadFieldsOfStudyAction),
    mergeMap(({ options, key }) => this.generalResourcesService.getFieldsOfStudy(options).pipe(
      map(collection => loadGeneralResourcesSuccessAction(
        { resourceType: GeneralResourcesStateKey.FIELDS_OF_STUDY, collection, key })),
      catchError(error => of(loadGeneralResourcesFailedAction({ error })))
    ))
  ));

  loadFieldOfStudyForIdIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadFieldOfStudyForIdIfNeededAction), throttleWithSelector(({ id }) => id),
    mergeIfNil(({ id }) => this.store.select(selectFieldOfStudyForId, id)),
    map(({ id }) => loadFieldOfStudyForIdAction({ id }))
  ));

  loadFieldOfStudyForIdAction = createEffect(() => this.actions.pipe(
    ofType(loadFieldOfStudyForIdAction),
    mergeMap(({ id }) => this.generalResourcesService.getFieldOfStudyForId(id).pipe(
      map(instance => loadGeneralResourceSuccessAction(
        { resourceType: GeneralResourcesStateKey.FIELDS_OF_STUDY, instance })),
      catchError(error => of(loadGeneralResourcesFailedAction({ error })))
    ))
  ));

  constructor(private readonly actions: Actions,
              private readonly store: Store<AppState>,
              private readonly generalResourcesService: GeneralResourcesApiService) {
  }

}
