import { createAction, props } from '@ngrx/store';
import { LoginData } from '../../models/login-data.model';
import { AuthData } from '../../models/auth-data.model';


export const refreshTokenAction = createAction('[AUTH] Refresh Token');
export const loginAction = createAction('[AUTH] Login', props<{ loginData: LoginData }>());
export const loginSuccessAction = createAction('[AUTH] Login success', props<{ authData: AuthData }>());
export const loginFailedAction = createAction('[AUTH] Login failed', props<{ error: any }>());
export const logoutAction = createAction('[AUTH] Logout');
