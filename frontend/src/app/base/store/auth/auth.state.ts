import { AuthData } from '../../models/auth-data.model';
import { BaseStoreState } from '../../../core/store/base-store-state.model';

export class AuthState extends BaseStoreState {
  authData?: AuthData;
}
