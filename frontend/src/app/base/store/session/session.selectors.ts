import { createFeatureSelector, createSelector } from '@ngrx/store';
import { sessionFeatureName } from './session.reducer';
import { SessionState } from './session.state';

export const selectSessionState = createFeatureSelector<SessionState>(sessionFeatureName);
export const selectSessionStateInProgress = createSelector(selectSessionState, state => state.isInProgress);
export const selectSessionStateError = createSelector(selectSessionState, state => state.error);
export const selectSessionContext = createSelector(selectSessionState, state => state.context);
export const selectSessionContextRole = createSelector(selectSessionState, state => state.context?.userRole);
export const selectSessionContextDiplomaSession = createSelector(selectSessionState, state => state.context?.diplomaSession);
export const selectSessionLanguage = createSelector(selectSessionState, state => state.language);
