import { Injectable } from '@angular/core';
import { Selector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app-state.model';
import { CleanableStoreService } from '../../../core/services/cleanable-store.service';
import {
  invalidateGeneralResourcesAction,
  loadDepartmentForIdAction,
  loadDepartmentForIdIfNeededAction,
  loadDepartmentsAction,
  LoadDepartmentsActionOptions,
  loadDepartmentsIfNeededAction,
  loadDiplomaSessionForIdAction,
  loadDiplomaSessionForIdIfNeededAction,
  loadDiplomaSessionsAction,
  LoadDiplomaSessionsActionOptions,
  loadDiplomaSessionsIfNeededAction,
  loadFieldOfStudyForIdAction,
  loadFieldOfStudyForIdIfNeededAction,
  loadFieldsOfStudyAction,
  LoadFieldsOfStudyActionOptions,
  loadFieldsOfStudyIfNeededAction,
  loadTimetableForIdAction,
  loadTimetableForIdIfNeededAction,
  loadTimetablesAction,
  LoadTimetablesActionOptions,
  loadTimetablesIfNeededAction
} from '../../store/general/general.actions';
import {
  selectDepartmentForId,
  selectDepartmentsForKey,
  selectDiplomaSessionForId,
  selectDiplomaSessionsForKey,
  selectFieldOfStudyForId,
  selectFieldsOfStudyForKey,
  selectGeneralStateError,
  selectGeneralStateInProgress,
  selectTimetableForId,
  selectTimetablesForKey
} from '../../store/general/general.selectors';
import { GeneralResourcesStateKey } from '../../store/general/general.state';
import { Department } from '../../models/dto/department.model';
import { FieldOfStudy } from '../../models/dto/field-of-study.model';
import { DiplomaSession } from '../../models/dto/diploma-session.model';
import { Timetable } from '../../models/dto/timetable.model';
import { IdType } from '../../models/dto/id.model';
import { filterExists } from '../../../core/tools/filter-exists';

@Injectable({
  providedIn: 'root'
})
export class GeneralResourcesStoreService extends CleanableStoreService {

  constructor(store: Store<AppState>) {
    super(store);
  }

  public getTimetablesForKey(options: LoadTimetablesActionOptions, ifNeededOnly = true): Observable<Timetable[]> {
    const key = options.toKey();
    this.loadTimetablesForKey(options, key, ifNeededOnly);
    return this.selectTimetablesForKey(key).pipe(filterExists());
  }

  public getTimetableForId(id: IdType, ifNeededOnly = true): Observable<Timetable> {
    this.loadTimetableForId(id, ifNeededOnly);
    return this.selectTimetableForId(id).pipe(filterExists());
  }

  public getDiplomaSessionsForKey(options: LoadDiplomaSessionsActionOptions, ifNeededOnly = true): Observable<DiplomaSession[]> {
    const key = options.toKey();
    this.loadDiplomaSessionForKey(options, key, ifNeededOnly);
    return this.selectDiplomaSessionsForKey(key).pipe(filterExists());
  }

  public getDiplomaSessionForId(id: IdType, ifNeededOnly = true): Observable<DiplomaSession> {
    this.loadDiplomaSessionForId(id, ifNeededOnly);
    return this.selectDiplomaSessionForId(id).pipe(filterExists());
  }

  public getDepartmentsForKey(options: LoadDepartmentsActionOptions, ifNeededOnly = true): Observable<Department[]> {
    const key = options.toKey();
    this.loadDepartmentsForKey(options, key, ifNeededOnly);
    return this.selectDepartmentsForKey(key).pipe(filterExists());
  }

  public getDepartmentForId(id: IdType, ifNeededOnly = true): Observable<Department> {
    this.loadDepartmentForId(id, ifNeededOnly);
    return this.selectDepartmentForId(id).pipe(filterExists());
  }

  public getFieldsOfStudy(options: LoadFieldsOfStudyActionOptions, ifNeededOnly = true): Observable<FieldOfStudy[]> {
    const key = options.toKey();
    this.loadFieldsOfStudyForKey(options, key, ifNeededOnly);
    return this.selectFieldsOfStudyForKey(key).pipe(filterExists());
  }

  public getFieldOfStudyForId(id: IdType, ifNeededOnly = true): Observable<FieldOfStudy> {
    this.loadFieldOfStudyForId(id, ifNeededOnly);
    return this.selectFieldOfStudyForId(id).pipe(filterExists());
  }

  public invalidateStoreForKey(resourceType: GeneralResourcesStateKey): void {
    this.store.dispatch(invalidateGeneralResourcesAction({ resourceType }));
  }

  public loadTimetablesForKey(options: LoadTimetablesActionOptions, key: string, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadTimetablesIfNeededAction({ options, key })
      : loadTimetablesAction({ options, key });
    this.store.dispatch(action);
  }

  public loadDiplomaSessionForKey(options: LoadDiplomaSessionsActionOptions, key: string, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadDiplomaSessionsIfNeededAction({ options, key })
      : loadDiplomaSessionsAction({ options, key });
    this.store.dispatch(action);
  }

  public loadDepartmentsForKey(options: LoadDepartmentsActionOptions, key: string, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadDepartmentsIfNeededAction({ options, key })
      : loadDepartmentsAction({ options, key });
    this.store.dispatch(action);
  }

  public loadFieldsOfStudyForKey(options: LoadFieldsOfStudyActionOptions, key: string, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadFieldsOfStudyIfNeededAction({ options, key })
      : loadFieldsOfStudyAction({ options, key });
    this.store.dispatch(action);
  }

  public loadTimetableForId(id: IdType, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadTimetableForIdIfNeededAction({ id })
      : loadTimetableForIdAction({ id });
    this.store.dispatch(action);
  }

  public loadDiplomaSessionForId(id: IdType, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadDiplomaSessionForIdIfNeededAction({ id })
      : loadDiplomaSessionForIdAction({ id });
    this.store.dispatch(action);
  }

  public loadDepartmentForId(id: IdType, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadDepartmentForIdIfNeededAction({ id })
      : loadDepartmentForIdAction({ id });
    this.store.dispatch(action);
  }

  public loadFieldOfStudyForId(id: IdType, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadFieldOfStudyForIdIfNeededAction({ id })
      : loadFieldOfStudyForIdAction({ id });
    this.store.dispatch(action);
  }

  public selectDepartmentsForKey(key: string): Observable<Department[] | undefined> {
    return this.store.select(selectDepartmentsForKey, key);
  }

  public selectDepartmentForId(id: IdType): Observable<Department | undefined> {
    return this.store.select(selectDepartmentForId, id);
  }

  public selectFieldsOfStudyForKey(key: string): Observable<FieldOfStudy[] | undefined> {
    return this.store.select(selectFieldsOfStudyForKey, key);
  }

  public selectFieldOfStudyForId(id: IdType): Observable<FieldOfStudy | undefined> {
    return this.store.select(selectFieldOfStudyForId, id);
  }

  public selectDiplomaSessionsForKey(key: string): Observable<DiplomaSession[] | undefined> {
    return this.store.select(selectDiplomaSessionsForKey, key);
  }

  public selectDiplomaSessionForId(id: IdType): Observable<DiplomaSession | undefined> {
    return this.store.select(selectDiplomaSessionForId, id);
  }

  public selectTimetablesForKey(key: string): Observable<Timetable[] | undefined> {
    return this.store.select(selectTimetablesForKey, key);
  }

  public selectTimetableForId(id: IdType): Observable<Timetable | undefined> {
    return this.store.select(selectTimetableForId, id);
  }

  public selectStateError(): Observable<any> {
    return this.store.select(selectGeneralStateError);
  }

  public getProgressSelector(): Selector<AppState, boolean> {
    return selectGeneralStateInProgress;
  }

}
