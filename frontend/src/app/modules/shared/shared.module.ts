import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { LocalDatePipe } from './pipes/local-date.pipe';
import { ValidationFeedbackComponent } from './components/validation-feedback/validation-feedback.component';
import { ErrorAlertComponent } from './components/alerts/error/error-alert.component';
import { ReservationDetailsComponent } from './components/reservation-details/reservation-details.component';
import { ThesisDetailsComponent } from './components/thesis-details/thesis-details.component';
import {
  ClarificationRequestDetailsComponent
} from './components/clarification-details/clarification-request-details.component';
import { ChangeRequestDetailsComponent } from './components/change-details/change-request-details.component';
import { WarningAlertComponent } from './components/alerts/warning/warning-alert.component';


@NgModule({
  declarations: [
    SidebarComponent,
    ErrorAlertComponent,
    ValidationFeedbackComponent,
    LocalDatePipe,
    ThesisDetailsComponent,
    ReservationDetailsComponent,
    ClarificationRequestDetailsComponent,
    ChangeRequestDetailsComponent,
    WarningAlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarComponent,
    ErrorAlertComponent,
    ValidationFeedbackComponent,
    LocalDatePipe,
    ThesisDetailsComponent,
    ReservationDetailsComponent,
    ClarificationRequestDetailsComponent,
    ChangeRequestDetailsComponent,
    WarningAlertComponent
  ]
})
export class SharedModule {
}
