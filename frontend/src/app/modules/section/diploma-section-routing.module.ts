import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RoleGuard } from '../../core/guards/role.guard';
import { Role } from '../../base/models/dto/role.model';
import { DiplomaSectionComponent } from './components/diploma-section/diploma-section.component';
import { EditTimetableComponent } from './components/timetable/edit-timetable.component';


const routes: Routes = [
  {
    path: 'diploma-section',
    canActivate: [AuthGuard, RoleGuard],
    canActivateChild: [AuthGuard, RoleGuard],
    data: { allowedRoles: [Role.DIPLOMA_SECTION_MEMBER] },
    component: DiplomaSectionComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'timetable'
      },
      {
        path: 'timetable',
        component: EditTimetableComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiplomaSectionRoutingModule {
}
