import { mergeMap, Observable } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { isNil } from 'lodash-es';

const innerAction = <T, O>(action: T, valueFn: (action: T) => Observable<O>, testFn: (value: O, action: T) => boolean) => {
  return valueFn(action).pipe(first(), filter(v => testFn(v, action)), map(() => action));
};

export function switchIf<T, O>(valueFn: (action: T) => Observable<O>, testFn: (value: O, action: T) => boolean) {
  return switchMap<T, Observable<T>>(action => innerAction(action, valueFn, testFn));
}

export function mergeIf<T, O>(valueFn: (action: T) => Observable<O>, testFn: (value: O, action: T) => boolean) {
  return mergeMap<T, Observable<T>>(action => innerAction(action, valueFn, testFn));
}

export function switchIfNil<T, O>(valueFn: (action: T) => Observable<O>) {
  return switchIf(valueFn, isNil);
}

export function mergeIfNil<T, O>(valueFn: (action: T) => Observable<O>) {
  return mergeIf(valueFn, isNil);
}
