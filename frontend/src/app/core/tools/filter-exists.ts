import { filter, OperatorFunction } from 'rxjs';
import { isNotNil } from './is-not-nil';
import { map } from 'rxjs/operators';

export function filterExists<T>(): OperatorFunction<T, NonNullable<T>> {
  return (source) => source.pipe(filter(value => isNotNil(value)), map(v => v!));
}
