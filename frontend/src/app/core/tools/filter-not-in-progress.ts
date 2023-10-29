import { filter, MonoTypeOperatorFunction } from 'rxjs';
import { BaseStoreState } from '../store/base-store-state.model';
import { isNil } from 'lodash-es';

export function filterNotInProgress<T extends BaseStoreState | undefined>(): MonoTypeOperatorFunction<T> {
  return filter(value => isNil(value) || !value.isInProgress);
}
