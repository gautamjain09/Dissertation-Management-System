import { createReducer, on } from '@ngrx/store';
import {
  invalidateCurrentUserAction,
  invalidateUserDataAction,
  loadCurrentUserAction,
  loadCurrentUserSuccessAction,
  loadEmployeeForIdAction,
  loadEmployeesAction,
  loadStudentForIdAction,
  loadStudentsAction,
  loadUserFailedAction,
  loadUserStoreCollectionSuccessAction,
  loadUserStoreInstanceSuccessAction
} from './user.actions';
import {
  failedReducer,
  resourceInvalidateReducer,
  resourcesSuccessReducer,
  resourceSuccessReducer,
  startProgressReducer,
  successReducerFn
} from '../../../core/store/base-store-state.model';
import { clearStoreAction } from '../../../core/store/clear-store.reducer';
import { UserState } from './user.state';

export const UserFeatureName = 'user';

export const initialState = new UserState();

export const userReducer = createReducer(
  initialState,
  on(loadCurrentUserAction, startProgressReducer()),
  on(loadCurrentUserSuccessAction, (state, { user }) => successReducerFn(state, { currentUser: user })),
  on(invalidateCurrentUserAction, (state) => successReducerFn(state, { currentUser: undefined })),

  on(loadStudentsAction, startProgressReducer()),
  on(loadStudentForIdAction, startProgressReducer()),
  on(loadEmployeesAction, startProgressReducer()),
  on(loadEmployeeForIdAction, startProgressReducer()),

  on(invalidateUserDataAction, resourceInvalidateReducer()),
  on(loadUserStoreInstanceSuccessAction, resourceSuccessReducer()),
  on(loadUserStoreCollectionSuccessAction, resourcesSuccessReducer()),

  on(loadUserFailedAction, failedReducer()),
  on(clearStoreAction, () => initialState)
);
