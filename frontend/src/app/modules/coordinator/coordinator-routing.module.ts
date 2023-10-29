import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoordinatorTopicsComponent } from './components/topics/coordinator-topics.component';
import { CoordinatorComponent } from './components/coordinator/coordinator.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RoleGuard } from '../../core/guards/role.guard';
import { Role } from '../../base/models/dto/role.model';
import { ThesisDetailsComponent } from '../shared/components/thesis-details/thesis-details.component';


const routes: Routes = [
  {
    path: 'coordinator',
    canActivate: [AuthGuard, RoleGuard],
    canActivateChild: [AuthGuard, RoleGuard],
    data: { allowedRoles: [Role.COORDINATOR] },
    component: CoordinatorComponent,
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
            component: CoordinatorTopicsComponent
          },
          {
            path: ':thesisId',
            pathMatch: 'full',
            component: ThesisDetailsComponent,
            data: {
              [ThesisDetailsComponent.HEADER_KEY]: 'ThesisDetails.Header.TopicReview'
            }
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
export class CoordinatorRoutingModule {
}
