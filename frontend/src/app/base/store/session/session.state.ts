import { BaseStoreState } from '../../../core/store/base-store-state.model';
import { AppLanguage } from '../../../core/models/app-language.model';
import { Context } from '../../models/context.model';

export class SessionState extends BaseStoreState {
  language?: AppLanguage;
  context?: Context;
}
