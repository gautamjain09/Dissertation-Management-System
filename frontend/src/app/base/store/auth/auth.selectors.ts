import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureName } from './auth.reducer';
import { AuthState } from './auth.state';
import { isNotNil } from '../../../core/tools/is-not-nil';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureName);
export const selectAuthStoreInProgress = createSelector(selectAuthState, state => state.isInProgress);
export const selectAuthError = createSelector(selectAuthState, state => state.error);
export const selectAuthData = createSelector(selectAuthState, state => state.authData);
export const selectIsLoggedIn = createSelector(selectAuthData, auth => isNotNil(auth));
