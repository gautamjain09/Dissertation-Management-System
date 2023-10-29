import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorAlertComponent {

  @Input()
  messageKey: string = 'Alert.Error.GenericError';

}
