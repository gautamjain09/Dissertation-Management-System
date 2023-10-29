import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserFeatureName } from './user.reducer';
import { UserState, UserStateKey } from './user.state';
import { AppState } from '../app-state.model';
import { forIdSelector, forKeySelector, StoreResource } from '../../../core/store/base-store-state.model';
import { Student } from '../../models/dto/student.model';
import { Employee } from '../../models/dto/employee.model';
import { IdType } from '../../models/dto/id.model';

export const selectUserState = createFeatureSelector<UserState>(UserFeatureName);
export const selectUserStateInProgress = createSelector(selectUserState, state => state.isInProgress);
export const selectUserStateError = createSelector(selectUserState, state => state.error);

export const selectCurrentUser = createSelector(selectUserState, state => state.currentUser);

export const selectStudentsStoreResource = createSelector(selectUserState, state => state[UserStateKey.STUDENT]);
export const selectStudentsForKey = createSelector<AppState, string, StoreResource<Student>, Student[] | undefined>(
  selectStudentsStoreResource, forKeySelector
);
export const selectStudentForId = createSelector<AppState, IdType, StoreResource<Student>, Student | undefined>(
  selectStudentsStoreResource, forIdSelector
);

export const selectEmployeesStoreResource = createSelector(selectUserState, state => state[UserStateKey.EMPLOYEE]);
export const selectEmployeesForKey = createSelector<AppState, string, StoreResource<Employee>, Employee[] | undefined>(
  selectEmployeesStoreResource, forKeySelector
);
export const selectEmployeeForId = createSelector<AppState, IdType, StoreResource<Employee>, Employee | undefined>(
  selectEmployeesStoreResource, forIdSelector
);
