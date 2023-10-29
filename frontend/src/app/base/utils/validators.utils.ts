import { ValidatorFn, Validators } from '@angular/forms';

export class AppValidators {

  public static get numberOfStudentsValidator(): ValidatorFn {
    return AppValidators.compose(
      Validators.required,
      Validators.min(1),
      Validators.max(5),
      AppValidators.integerValidator
    );
  }

  public static get topicValidator(): ValidatorFn {
    return AppValidators.compose(Validators.required, Validators.maxLength(160));
  }

  public static get descriptionValidator(): ValidatorFn {
    return AppValidators.compose(Validators.required, Validators.maxLength(2000));
  }

  public static get notificationValidator(): ValidatorFn {
    return AppValidators.compose(Validators.required, Validators.maxLength(2000));
  }

  public static get coordinatorCommentValidator(): ValidatorFn {
    return AppValidators.compose(Validators.required, Validators.maxLength(1000));
  }

  public static get loginFieldValidator(): ValidatorFn {
    return AppValidators.compose(Validators.required, Validators.max(16));
  }

  public static get deadline(): ValidatorFn {
    return Validators.required;
  }

  private static integerValidator(): ValidatorFn {
    return Validators.pattern(/^-?[0-9]+$/);
  }

  private static compose(validator: ValidatorFn, ...validators: ValidatorFn[]): ValidatorFn {
    return Validators.compose([validator, ...validators])!;
  }


}
