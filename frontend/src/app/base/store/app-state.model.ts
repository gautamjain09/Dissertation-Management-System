import { authFeatureName } from './auth/auth.reducer';
import { AuthState } from './auth/auth.state';
import { sessionFeatureName } from './session/session.reducer';
import { SessionState } from './session/session.state';

export interface AppState {
  [authFeatureName]: AuthState;
  [sessionFeatureName]: SessionState;
}
