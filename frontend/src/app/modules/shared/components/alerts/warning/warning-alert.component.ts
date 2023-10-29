import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


@Component({
  selector: 'app-warning-alert',
  templateUrl: './warning-alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WarningAlertComponent {

  @Input()
  messageKey?: string;

}
