import { Injectable } from '@angular/core';
import { Selector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app-state.model';
import { CleanableStoreService } from '../../../core/services/cleanable-store.service';
import {
  selectCurrentUser,
  selectEmployeeForId,
  selectEmployeesForKey,
  selectStudentForId,
  selectStudentsForKey,
  selectUserState,
  selectUserStateError,
  selectUserStateInProgress
} from '../../store/user/user.selectors';
import { User } from '../../models/dto/user.model';
import {
  invalidateCurrentUserAction,
  invalidateUserDataAction,
  loadCurrentUserAction,
  loadCurrentUserIfNeededAction,
  loadEmployeeForIdAction,
  loadEmployeeForIdIfNeededAction,
  loadEmployeesAction,
  LoadEmployeesActionOptions,
  loadEmployeesIfNeededAction,
  loadStudentForIdAction,
  loadStudentForIdIfNeededAction,
  loadStudentsAction,
  LoadStudentsActionOptions,
  loadStudentsIfNeededAction
} from '../../store/user/user.actions';
import { UserState, UserStateKey } from '../../store/user/user.state';
import { filterExists } from '../../../core/tools/filter-exists';
import { IdType } from '../../models/dto/id.model';
import { Student } from '../../models/dto/student.model';
import { Employee } from '../../models/dto/employee.model';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService extends CleanableStoreService {

  constructor(store: Store<AppState>) {
    super(store);
  }

  public getCurrentUser(ifNeededOnly = true): Observable<User | undefined> {
    this.loadCurrentUser(ifNeededOnly);
    return this.selectCurrentUser();
  }

  public getEmployees(options: LoadEmployeesActionOptions): Observable<Employee[]> {
    const key = options.toKey();
    this.loadEmployees(options, key);
    return this.selectEmployeesForKey(key).pipe(filterExists());
  }

  public getEmployeeForId(id: IdType): Observable<Employee> {
    this.loadEmployeeForId(id);
    return this.selectEmployeeForId(id).pipe(filterExists());
  }

  public getStudents(options: LoadStudentsActionOptions): Observable<Student[]> {
    const key = options.toKey();
    this.loadStudents(options, key);
    return this.selectStudentsForKey(key).pipe(filterExists());
  }

  public getStudentForId(id: IdType): Observable<Student> {
    this.loadStudentForId(id);
    return this.selectStudentForId(id).pipe(filterExists());
  }

  public loadCurrentUser(ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadCurrentUserIfNeededAction()
      : loadCurrentUserAction();
    this.store.dispatch(action);
  }

  public loadEmployees(options: LoadEmployeesActionOptions, key: string, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadEmployeesIfNeededAction({ options, key })
      : loadEmployeesAction({ options, key });
    this.store.dispatch(action);
  }

  public loadEmployeeForId(id: IdType, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadEmployeeForIdIfNeededAction({ id })
      : loadEmployeeForIdAction({ id });
    this.store.dispatch(action);
  }

  public loadStudents(options: LoadStudentsActionOptions, key: string, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadStudentsIfNeededAction({ options, key })
      : loadStudentsAction({ options, key });
    this.store.dispatch(action);
  }

  public loadStudentForId(id: IdType, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadStudentForIdIfNeededAction({ id })
      : loadStudentForIdAction({ id });
    this.store.dispatch(action);
  }

  public invalidateCurrentUser(): void {
    this.store.dispatch(invalidateCurrentUserAction());
  }

  public invalidateStoreForType(resourceType: UserStateKey): void {
    this.store.dispatch(invalidateUserDataAction({ resourceType }));
  }

  public selectEmployeesForKey(key: string): Observable<Employee[] | undefined> {
    return this.store.select(selectEmployeesForKey, key);
  }

  public selectEmployeeForId(id: IdType): Observable<Employee | undefined> {
    return this.store.select(selectEmployeeForId, id);
  }

  public selectStudentsForKey(key: string): Observable<Student[] | undefined> {
    return this.store.select(selectStudentsForKey, key);
  }

  public selectStudentForId(id: IdType): Observable<Student | undefined> {
    return this.store.select(selectStudentForId, id);
  }

  public selectCurrentUser(): Observable<User | undefined> {
    return this.store.select(selectCurrentUser);
  }

  public selectUserState(): Observable<UserState | undefined> {
    return this.store.select(selectUserState);
  }

  public selectStateError(): Observable<any> {
    return this.store.select(selectUserStateError);
  }

  public getProgressSelector(): Selector<AppState, boolean> {
    return selectUserStateInProgress;
  }

}
