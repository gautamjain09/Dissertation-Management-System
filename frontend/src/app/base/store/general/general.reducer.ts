import { createReducer, on } from '@ngrx/store';
import {
  failedReducer,
  resourceInvalidateReducer,
  resourcesSuccessReducer,
  resourceSuccessReducer,
  startProgressReducer
} from '../../../core/store/base-store-state.model';
import { clearStoreAction } from '../../../core/store/clear-store.reducer';
import { GeneralState } from './general.state';
import {
  invalidateGeneralResourcesAction,
  loadDepartmentForIdAction,
  loadDepartmentsAction,
  loadDiplomaSessionForIdAction,
  loadDiplomaSessionsAction,
  loadFieldOfStudyForIdAction,
  loadFieldsOfStudyAction,
  loadGeneralResourcesFailedAction,
  loadGeneralResourcesSuccessAction,
  loadGeneralResourceSuccessAction,
  loadTimetableForIdAction,
  loadTimetablesAction
} from './general.actions';

export const generalFeatureName = 'general';

export const initialState = new GeneralState();

export const generalResourcesReducer = createReducer(
  initialState,
  on(loadTimetablesAction, startProgressReducer()),
  on(loadTimetableForIdAction, startProgressReducer()),
  on(loadDiplomaSessionsAction, startProgressReducer()),
  on(loadDiplomaSessionForIdAction, startProgressReducer()),
  on(loadDepartmentsAction, startProgressReducer()),
  on(loadDepartmentForIdAction, startProgressReducer()),
  on(loadFieldsOfStudyAction, startProgressReducer()),
  on(loadFieldOfStudyForIdAction, startProgressReducer()),

  on(loadGeneralResourcesFailedAction, failedReducer()),
  on(loadGeneralResourceSuccessAction, resourceSuccessReducer()),
  on(loadGeneralResourcesSuccessAction, resourcesSuccessReducer()),
  on(invalidateGeneralResourcesAction, resourceInvalidateReducer()),
  on(clearStoreAction, () => initialState)
);
