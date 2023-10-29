import { createFeatureSelector, createSelector } from '@ngrx/store';
import { requestsFeatureName } from './requests.reducer';
import { RequestsState, RequestsStateKey } from './requests.state';
import { AppState } from '../app-state.model';
import { forIdSelector, forKeySelector, StoreResource } from '../../../core/store/base-store-state.model';
import { ClarificationRequest } from '../../models/dto/clarification-request.model';
import { ChangeRequest } from '../../models/dto/change-request.model';
import { IdType } from '../../models/dto/id.model';

export const selectRequestsState = createFeatureSelector<RequestsState>(requestsFeatureName);
export const selectRequestsStateInProgress = createSelector(selectRequestsState, state => state.isInProgress);
export const selectRequestsStateError = createSelector(selectRequestsState, state => state.error);

export const selectClarificationRequestsStoreResource = createSelector(selectRequestsState, state => state[RequestsStateKey.CLARIFICATION]);
export const selectClarificationRequestsForKey = createSelector<AppState, string, StoreResource<ClarificationRequest>, ClarificationRequest[] | undefined>(
  selectClarificationRequestsStoreResource, forKeySelector
);
export const selectClarificationRequestForId = createSelector<AppState, IdType, StoreResource<ClarificationRequest>, ClarificationRequest | undefined>(
  selectClarificationRequestsStoreResource, forIdSelector
);

export const selectChangeRequestsStoreResource = createSelector(selectRequestsState, state => state[RequestsStateKey.CHANGE]);
export const selectChangeRequestsForKey = createSelector<AppState, string, StoreResource<ChangeRequest>, ChangeRequest[] | undefined>(
  selectChangeRequestsStoreResource, forKeySelector
);
export const selectChangeRequestForId = createSelector<AppState, IdType, StoreResource<ChangeRequest>, ChangeRequest | undefined>(
  selectChangeRequestsStoreResource, forIdSelector
);
