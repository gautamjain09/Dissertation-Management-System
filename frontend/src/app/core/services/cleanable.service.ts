import { Cleanable } from '../components/cleanable.directive';
import { ChangeDetectorRef } from '@angular/core';

export interface CleanableService {
  init(cleanable: Cleanable, changeDetector: ChangeDetectorRef): void;
}
