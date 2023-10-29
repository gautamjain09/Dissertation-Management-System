import { ChangeDetectorRef, Directive } from '@angular/core';
import { Role } from 'src/app/base/models/dto/role.model';
import { LabelBuilder } from 'src/app/base/utils/label-builder.utils';
import { TranslationKeys } from 'src/app/base/utils/translation-keys.utils';
import { Cleanable } from './cleanable.directive';
import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import { filterExists } from '../tools/filter-exists';

@Directive()
export abstract class BaseComponent extends Cleanable {

  Role = Role;
  LabelBuilder = LabelBuilder;
  TranslationKeys = TranslationKeys;

  isErrorVisible = false;
  reloadTrigger = new BehaviorSubject<boolean>(true);

  protected constructor(protected readonly changeDetector: ChangeDetectorRef) {
    super();
  }

  protected markForCheck(): void {
    this.changeDetector.markForCheck();
  }

  protected detectChanges(): void {
    this.changeDetector.detectChanges();
  }

  public getErrorsFromArray(form: FormArray, index: number): ValidationErrors | null {
    const control = form!.controls[index]!;
    return (control.dirty || control.touched) ? control.errors : null;
  }

  public getErrors(form: FormGroup, controlName: string): ValidationErrors | null {
    const control = form!.get(controlName)!;
    return (control.dirty || control.touched) ? control.errors : null;
  }

  protected getPathParam(route: ActivatedRoute, name: string): Observable<string> {
    return route.paramMap.pipe(
      map(params => params.get(name)),
      filterExists(),
      distinctUntilChanged()
    );
  };

  protected handleAction<T>(actionSource: Observable<T>): void {
    this.addSubscription(actionSource.subscribe({
      next: () => this.reload(),
      error: () => this.showError()
    }));
  }

  protected showError(): void {
    this.isErrorVisible = true;
    this.markForCheck();
  }

  protected reload(): void {
    this.isErrorVisible = false;
    this.reloadTrigger.next(true);
  }
}
