import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RoleGuard } from '../../core/guards/role.guard';
import { Role } from '../../base/models/dto/role.model';
import { LecturerTopicsComponent } from './components/topics/lecturer-topics.component';
import { LecturerComponent } from './components/lecturer/lecturer.component';
import { LecturerTopicCreateComponent } from './components/topics/create/lecturer-topic-create.component';
import { LecturerReservationsComponent } from './components/reservations/lecturer-reservations.component';
import { ThesisDetailsComponent } from '../shared/components/thesis-details/thesis-details.component';
import { ReservationDetailsComponent } from '../shared/components/reservation-details/reservation-details.component';


const routes: Routes = [
  {
    path: 'lecturer',
    canActivate: [AuthGuard, RoleGuard],
    canActivateChild: [AuthGuard, RoleGuard],
    data: { allowedRoles: [Role.LECTURER] },
    component: LecturerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'topic'
      },
      {
        path: 'topic',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: LecturerTopicsComponent
          },
          {
            path: 'create',
            component: LecturerTopicCreateComponent
          },
          {
            path: 'details/:thesisId',
            component: ThesisDetailsComponent
          },
          {
            path: 'review/:thesisId',
            component: ThesisDetailsComponent
          },
          {
            path: 'correct/:thesisId',
            component: ThesisDetailsComponent
          }
        ]
      },
      {
        path: 'reservations',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: LecturerReservationsComponent
          },
          {
            path: ':reservationId',
            component: ReservationDetailsComponent
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
export class LecturerRoutingModule {
}
