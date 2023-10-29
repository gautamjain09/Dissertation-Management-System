import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-validation-feedback',
  templateUrl: './validation-feedback.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationFeedbackComponent {

  @Input()
  errors: ValidationErrors | null = null;

}
