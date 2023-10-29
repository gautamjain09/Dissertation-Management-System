import { ActionReducer, createAction } from '@ngrx/store';
import { logoutAction } from '../../base/store/auth/auth.actions';

const clearingActionTypes: string[] = [
  logoutAction.type
];

export const clearStoreAction = createAction('[CLEAR] Clear Store');

export function clearStoreMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    if (clearingActionTypes.includes(action.type)) {
      // not setting undefined instead store because we want to preserve in ex. language
      return reducer(state, clearStoreAction());
    }
    return reducer(state, action);
  };
}
