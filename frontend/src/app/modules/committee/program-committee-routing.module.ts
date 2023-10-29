import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RoleGuard } from '../../core/guards/role.guard';
import { Role } from '../../base/models/dto/role.model';
import { ProgramCommitteeTopicsComponent } from './components/topics/program-committee-topics.component';
import { ProgramCommitteeComponent } from './components/program-committee/program-committee.component';
import { ThesisDetailsComponent } from '../shared/components/thesis-details/thesis-details.component';
import {
  ProgramCommitteeTopicChangeComponent
} from './components/topic-changes/program-committee-topic-change.component';
import { ChangeRequestDetailsComponent } from '../shared/components/change-details/change-request-details.component';


const routes: Routes = [
  {
    path: 'program-committee',
    canActivate: [AuthGuard, RoleGuard],
    canActivateChild: [AuthGuard, RoleGuard],
    data: { allowedRoles: [Role.PROGRAM_COMMITTEE_MEMBER] },
    component: ProgramCommitteeComponent,
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
            component: ProgramCommitteeTopicsComponent
          },
          {
            path: ':thesisId',
            component: ThesisDetailsComponent,
            data: {
              [ThesisDetailsComponent.HEADER_KEY]: 'ThesisDetails.Header.TopicReview'
            }
          }
        ]
      },
      {
        path: 'change-requests',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: ProgramCommitteeTopicChangeComponent
          },
          {
            path: ':requestId',
            component: ChangeRequestDetailsComponent
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
export class ProgramCommitteeRoutingModule {
}
