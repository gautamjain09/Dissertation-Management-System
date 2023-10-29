import { createReducer, on } from '@ngrx/store';
import {
  failedReducer,
  resourceInvalidateReducer,
  resourcesSuccessReducer,
  resourceSuccessReducer,
  startProgressReducer
} from '../../../core/store/base-store-state.model';
import { clearStoreAction } from '../../../core/store/clear-store.reducer';
import { RequestsState } from './requests.state';
import {
  invalidateRequestsDataAction,
  loadChangeRequestForIdAction,
  loadChangeRequestsAction,
  loadClarificationRequestForIdAction,
  loadClarificationRequestsAction,
  loadRequestsFailedAction,
  loadRequestsSuccessAction,
  loadRequestSuccessAction
} from './requests.actions';

export const requestsFeatureName = 'requests';

export const initialState = new RequestsState();

export const requestsReducer = createReducer(
  initialState,
  on(loadClarificationRequestsAction, startProgressReducer()),
  on(loadClarificationRequestForIdAction, startProgressReducer()),
  on(loadChangeRequestsAction, startProgressReducer()),
  on(loadChangeRequestForIdAction, startProgressReducer()),
  on(loadRequestsFailedAction, failedReducer()),
  on(loadRequestSuccessAction, resourceSuccessReducer()),
  on(loadRequestsSuccessAction, resourcesSuccessReducer()),
  on(invalidateRequestsDataAction, resourceInvalidateReducer()),
  on(clearStoreAction, () => initialState)
);
