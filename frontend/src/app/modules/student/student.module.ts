import { NgModule } from '@angular/core';

import { StudentRoutingModule } from './student-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StudentComponent } from './components/student/student.component';
import { StudentChangeRequestsComponent } from './components/topic-change/student-change-requests.component';
import {
  StudentTopicClarificationsComponent
} from './components/topic-clarification/student-topic-clarifications.component';
import { StudentReservationsComponent } from './components/reservations/student-reservations.component';
import {
  StudentCreateReservationComponent
} from './components/reservations/create/student-create-reservation.component';
import { StudentTopicPropositionsComponent } from './components/propositions/student-topic-propositions.component';
import {
  StudentCreateClarificationRequestComponent
} from './components/topic-clarification/create/student-create-clarification-request.component';
import {
  StudentCreateChangeRequestComponent
} from './components/topic-change/create/student-create-change-request.component';
import { StudentCreateThesisComponent } from './components/propositions/create/student-create-thesis.component';

@NgModule({
  declarations: [
    StudentComponent,
    StudentChangeRequestsComponent,
    StudentReservationsComponent,
    StudentCreateThesisComponent,
    StudentCreateReservationComponent,
    StudentTopicPropositionsComponent,
    StudentTopicClarificationsComponent,
    StudentCreateChangeRequestComponent,
    StudentCreateClarificationRequestComponent
  ],
  imports: [
    SharedModule,
    StudentRoutingModule
  ]
})
export class StudentModule {
}
