import { ChangeDetectorRef, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounce } from 'lodash-es';

export const spinnerName = 'spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private openedSpinners: number = 0;

  constructor(private readonly spinnerService: NgxSpinnerService) {
    this.doHide = debounce(this.doHide, 350);
  }

  public act(isShowing: boolean, changeDetector?: ChangeDetectorRef): void {
    if (isShowing) {
      this.show(changeDetector);
    } else {
      this.hide(changeDetector);
    }
  }

  public showFor(time: number, changeDetector?: ChangeDetectorRef): void {
    this.show(changeDetector);
    setTimeout(() => this.hide(changeDetector), time);
  }

  public show(changeDetector?: ChangeDetectorRef): void {
    if (this.openedSpinners === 0) {
      this.spinnerService.show(spinnerName).then(() => this.markForCheck(changeDetector));
    }
    this.changeOpenedSpinnersCount(1);
  }

  public hide(changeDetector?: ChangeDetectorRef, name: string = spinnerName): void {
    this.changeOpenedSpinnersCount(-1);
    this.doHide(changeDetector, name);
  }

  // Debounced function => look constructor
  private doHide(changeDetector?: ChangeDetectorRef, name: string = spinnerName): void {
    if (this.openedSpinners === 0) {
      this.spinnerService.hide(name).then(() => this.markForCheck(changeDetector));
    }
  }

  private changeOpenedSpinnersCount(change: number): void {
    const sum = this.openedSpinners + change;
    this.openedSpinners = sum < 0 ? 0 : sum;
  }

  private markForCheck(changeDetector?: ChangeDetectorRef): void {
    changeDetector?.markForCheck();
  }

}
