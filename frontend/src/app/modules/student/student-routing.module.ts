import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './components/student/student.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RoleGuard } from '../../core/guards/role.guard';
import { Role } from '../../base/models/dto/role.model';
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
  ClarificationRequestDetailsComponent
} from '../shared/components/clarification-details/clarification-request-details.component';
import {
  StudentCreateChangeRequestComponent
} from './components/topic-change/create/student-create-change-request.component';
import { ReservationDetailsComponent } from '../shared/components/reservation-details/reservation-details.component';
import { ThesisDetailsComponent } from '../shared/components/thesis-details/thesis-details.component';
import { StudentCreateThesisComponent } from './components/propositions/create/student-create-thesis.component';
import { ChangeRequestDetailsComponent } from '../shared/components/change-details/change-request-details.component';


const routes: Routes = [
  {
    path: 'student',
    canActivate: [AuthGuard, RoleGuard],
    canActivateChild: [AuthGuard, RoleGuard],
    data: { allowedRoles: [Role.STUDENT] },
    component: StudentComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'reservations'
      },
      {
        path: 'reservations',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: StudentReservationsComponent
          },
          {
            path: 'details/:reservationId',
            component: ReservationDetailsComponent
          },
          {
            path: 'topic/:thesisId',
            component: ThesisDetailsComponent
          },
          {
            path: 'create/:thesisId',
            component: StudentCreateReservationComponent
          }
        ]
      },
      {
        path: 'topic-propositions',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: StudentTopicPropositionsComponent
          },
          {
            path: 'details/:thesisId',
            component: ThesisDetailsComponent
          },
          {
            path: 'create',
            component: StudentCreateThesisComponent
          }
        ]
      },
      {
        path: 'change-requests',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: StudentChangeRequestsComponent
          },
          {
            path: 'details/:requestId',
            component: ChangeRequestDetailsComponent
          },
          {
            path: 'create',
            component: StudentCreateChangeRequestComponent
          }
        ]
      },
      {
        path: 'clarification-requests',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: StudentTopicClarificationsComponent
          },
          {
            path: 'details/:requestId',
            component: ClarificationRequestDetailsComponent
          },
          {
            path: 'create',
            component: StudentCreateClarificationRequestComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
