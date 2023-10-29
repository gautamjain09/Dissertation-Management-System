import { createReducer, on } from '@ngrx/store';
import {
  failedReducer,
  resourceInvalidateReducer,
  resourcesSuccessReducer,
  resourceSuccessReducer,
  startProgressReducer
} from '../../../core/store/base-store-state.model';
import { clearStoreAction } from '../../../core/store/clear-store.reducer';
import { ThesesState } from './theses.state';
import {
  invalidateThesesDataAction,
  loadReservationForIdAction,
  loadReservationsAction,
  loadThesesAction,
  loadThesesFailedAction,
  loadThesesStoreCollectionSuccessAction,
  loadThesisForIdAction,
  loadThesisStoreInstanceSuccessAction
} from './theses.actions';

export const thesesFeatureName = 'theses';

export const initialState = new ThesesState();

export const thesesReducer = createReducer(
  initialState,
  on(loadReservationsAction, startProgressReducer()),
  on(loadReservationForIdAction, startProgressReducer()),
  on(loadThesesAction, startProgressReducer()),
  on(loadThesisForIdAction, startProgressReducer()),
  on(loadThesesFailedAction, failedReducer()),
  on(loadThesisStoreInstanceSuccessAction, resourceSuccessReducer()),
  on(loadThesesStoreCollectionSuccessAction, resourcesSuccessReducer()),
  on(invalidateThesesDataAction, resourceInvalidateReducer()),
  on(clearStoreAction, () => initialState)
);
