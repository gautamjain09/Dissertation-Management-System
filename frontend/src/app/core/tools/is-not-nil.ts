import { isNil } from "lodash-es";

export function isNotNil(value: any): boolean {
  return !isNil(value);
}
