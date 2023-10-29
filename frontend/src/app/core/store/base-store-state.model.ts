import { OnReducer } from '@ngrx/store/src/reducer_creator';
import { ActionType } from '@ngrx/store/src/models';
import { Dictionary } from '../models/dictionary.model';
import { IdType, WithId } from '../../base/models/dto/id.model';
import { keyBy } from 'lodash-es';

export abstract class BaseStoreState {
  isInProgress = false;
  error: any;
}

export class StoreResource<T extends WithId> {
  constructor(public cachedById: Dictionary<T> = {},
              public idsByKey: Dictionary<string[]> = {}) {
  }

  addInstance(instance: T): StoreResource<T> {
    const newCache = { ...this.cachedById, [instance.id]: instance };
    return new StoreResource<T>(newCache, this.idsByKey);
  }

  addCollection(key: string, collection: T[]): StoreResource<T> {
    const ids = collection.map(i => i.id);
    const collectionById = keyBy(collection, item => item.id);
    const newCache = { ...this.cachedById, ...collectionById };
    const idsByKey = { ...this.idsByKey, [key]: ids };
    return new StoreResource<T>(newCache, idsByKey);
  }
}

export function forIdSelector<T extends WithId>(resource: StoreResource<T>, id: IdType): T | undefined {
  return resource.cachedById[id];
}

export function forKeySelector<T extends WithId>(resource: StoreResource<T>, key: string): T[] | undefined {
  return resource.idsByKey[key]?.map(id => resource.cachedById[id]);
}


export function successReducerFn<T extends BaseStoreState>(state: T, override: Partial<T> = {}): T {
  return { ...state, isInProgress: false, error: undefined, ...override };
}

export function failedReducerFn<T extends BaseStoreState>(state: T, error: any, override: Partial<T> = {}): T {
  return { ...state, isInProgress: false, error, ...override };
}

export function startProgressReducerFn<T extends BaseStoreState>(state: T, override: Partial<T> = {}): T {
  return { ...state, isInProgress: true, ...override };
}


export function failedReducer<T extends BaseStoreState>(override: Partial<T> = {}): OnReducer<T, ActionType<{ error: any }>> {
  return (state: T, { error }) => failedReducerFn(state, error, override);
}

export function startProgressReducer<T extends BaseStoreState>(override: Partial<T> = {}): OnReducer<T, ActionType<any>> {
  return (state: T, action: ActionType<any>) => ({ ...state, isInProgress: true, ...override });
}

export function resourceInvalidateReducer<T extends BaseStoreState, O extends WithId>(override: Partial<T> = {})
  : OnReducer<T, ActionType<{ resourceType: string }>> {
  return (state: T, { resourceType }) => {
    const finalOverride: Partial<T> = {
      [resourceType]: new StoreResource<O>(),
      ...override
    } as Partial<T>;
    return successReducerFn(state, finalOverride);
  };
}

export function resourceSuccessReducer<T extends BaseStoreState, O extends WithId>(override: Partial<T> = {})
  : OnReducer<T, ActionType<{ resourceType: string, instance: O }>> {
  return (state: T, { resourceType, instance }) => {
    const typedState = state as any as Dictionary<StoreResource<O>>;
    const finalOverride: Partial<T> = {
      [resourceType]: typedState[resourceType].addInstance(instance),
      ...override
    } as Partial<T>;
    return successReducerFn(state, finalOverride);
  };
}

export function resourcesSuccessReducer<T extends BaseStoreState, O extends WithId>(override: Partial<T> = {})
  : OnReducer<T, ActionType<{ resourceType: string, collection: O[], key: string }>> {
  return (state: T, { resourceType, collection, key }) => {
    const typedState = state as any as Dictionary<StoreResource<O>>;
    const finalOverride: Partial<T> = {
      [resourceType]: typedState[resourceType].addCollection(key, collection),
      ...override
    } as Partial<T>;
    return successReducerFn(state, finalOverride);
  };
}
