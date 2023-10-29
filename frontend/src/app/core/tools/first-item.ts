import { isEmpty } from 'lodash-es';

export function firstItem<T>(arr?: T[]): T | undefined {
  if (isEmpty(arr)) {
    return undefined;
  }
  return arr![0];
}
