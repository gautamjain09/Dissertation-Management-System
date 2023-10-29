import { createAction, props } from '@ngrx/store';
import { User } from '../../models/dto/user.model';
import { IdType } from '../../models/dto/id.model';
import { UserStateKey, UserStoreType } from './user.state';
import { EmployeeRole } from '../../models/dto/employee-role.model';


export const loadCurrentUserAction = createAction('[USER] Load current user');
export const loadCurrentUserIfNeededAction = createAction('[USER] Load current user if needed');

export const loadStudentsAction = createAction(
  '[USER] Load students',
  props<{ options: LoadStudentsActionOptions, key: string }>()
);
export const loadStudentsIfNeededAction = createAction(
  '[USER] Load students if needed',
  props<{ options: LoadStudentsActionOptions, key: string }>()
);
export const loadStudentForIdAction = createAction(
  '[USER] Load student for id',
  props<{ id: IdType }>()
);
export const loadStudentForIdIfNeededAction = createAction(
  '[USER] Load student for id if needed',
  props<{ id: IdType }>()
);

export const loadEmployeesAction = createAction(
  '[USER] Load employees',
  props<{ options: LoadEmployeesActionOptions, key: string }>()
);
export const loadEmployeesIfNeededAction = createAction(
  '[USER] Load employees if needed',
  props<{ options: LoadEmployeesActionOptions, key: string }>()
);
export const loadEmployeeForIdAction = createAction(
  '[USER] Load employee for id',
  props<{ id: IdType }>()
);
export const loadEmployeeForIdIfNeededAction = createAction(
  '[USER] Load employee for id if needed',
  props<{ id: IdType }>()
);

export const invalidateCurrentUserAction = createAction('[USER] Invalidate current user');
export const invalidateUserDataAction = createAction(
  '[USER] Invalidate store resource',
  props<{ resourceType: UserStateKey }>()
);

export const loadCurrentUserSuccessAction = createAction(
  '[USER] Load current user successful',
  props<{ user: User }>()
);
export const loadUserStoreCollectionSuccessAction = createAction(
  '[USER] Load collection successful',
  props<{ resourceType: UserStateKey, collection: UserStoreType[], key: string }>()
);
export const loadUserStoreInstanceSuccessAction = createAction(
  '[USER] Load instance successful',
  props<{ resourceType: UserStateKey, instance: UserStoreType }>()
);

export const loadUserFailedAction = createAction(
  '[USER] Load failed',
  props<{ error: any }>()
);


export class LoadStudentsActionOptions {
  diplomaSessionId?: IdType;

  static forParticipateInReservation(diplomaSessionId: IdType): LoadStudentsActionOptions {
    const options = new LoadStudentsActionOptions();
    options.diplomaSessionId = diplomaSessionId;
    return options;
  }

  toKey(): string {
    return [
      'LoadStudentsActionOptions',
      'DSI_' + this.diplomaSessionId
    ].join('$');
  }
}

export class LoadEmployeesActionOptions {
  diplomaSessionId?: IdType;
  role?: EmployeeRole;

  public static forSupervisingInDiplomaSession(diplomaSessionId: IdType): LoadEmployeesActionOptions {
    const options = new LoadEmployeesActionOptions();
    options.diplomaSessionId = diplomaSessionId;
    options.role = EmployeeRole.LECTURER;
    return options;
  }

  toKey(): string {
    return [
      'LoadEmployeesActionOptions',
      'DSI_' + this.diplomaSessionId,
      'R_' + this.role
    ].join('$');
  }
}
