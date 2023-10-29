import { isNotNil } from '../tools/is-not-nil';

export interface RequestParam {
  key: string;
  value: string;
}

export class RequestParams {
  constructor(private params: RequestParam[] = []) {
  }

  getAll(): RequestParam[] {
    return this.params;
  }

  addIfValueExists(key: string, value?: boolean | number | string): void {
    if (isNotNil(value)) {
      this.params.push({ key, value: String(value) });
    }
  }
}
