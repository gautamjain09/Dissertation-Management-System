import { mergeMap, Observable, OperatorFunction } from 'rxjs';
import { groupBy, throttleTime } from 'rxjs/operators';

export function throttleWithSelector<T>(selector: (value: T) => any = () => true, throttleTimeout: number = 1000): OperatorFunction<T, T> {
  return (source: Observable<T>) => source.pipe(
    groupBy(selector),
    mergeMap((group) => group.pipe(throttleTime(throttleTimeout)))
  );
}
