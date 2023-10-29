import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base-component.directive';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthStoreService } from '../../../../base/services/store/auth-store.service';
import { LoginData } from '../../../../base/models/login-data.model';
import { SpinnerService } from '../../../../core/services/spinner.service';
import { Store } from '@ngrx/store';
import { ContextRoutingService } from '../../../../core/services/context-routing.service';
import { filter, switchMap } from 'rxjs';
import { UserStoreService } from '../../../../base/services/store/user-store.service';
import { SessionService } from '../../../../base/services/session.service';
import { AppValidators } from '../../../../base/utils/validators.utils';
import { isNotNil } from '../../../../core/tools/is-not-nil';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends BaseComponent implements OnInit {

  error?: boolean;
  form?: FormGroup;

  constructor(private readonly store: Store,
              private readonly formBuilder: FormBuilder,
              private readonly spinnerService: SpinnerService,
              private readonly sessionService: SessionService,
              private readonly contextRoutingService: ContextRoutingService,
              private readonly userStoreService: UserStoreService,
              private readonly authStoreService: AuthStoreService,
              changeDetector: ChangeDetectorRef) {
    super(changeDetector);
  }


  login(): void {
    const data: LoginData = this.form!.getRawValue();
    this.authStoreService.login(data);
  }

  ngOnInit(): void {
    this.initForm();
    this.handleLoginFailure();
    this.handleSuccessfulLogin();
  }

  private handleLoginFailure(): void {
    this.addSubscription(
      this.authStoreService.getError()
        .subscribe(error => {
          this.error = isNotNil(error);
          this.changeDetector.markForCheck();
        })
    );
  }

  private handleSuccessfulLogin(): void {
    this.addSubscription(
      this.authStoreService.isUserLoggedIn().pipe(
        filter(isLogged => isLogged),
        switchMap(() => this.contextRoutingService.calculateNewUserRole())
      ).subscribe(role => this.sessionService.setContextRole(role))
    );
  }

  private initForm() {
    this.form = this.formBuilder.group({
      username: ['asldcpm_2', AppValidators.loginFieldValidator],
      password: ['password', AppValidators.loginFieldValidator]
    });
  }


}
