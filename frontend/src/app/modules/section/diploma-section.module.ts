import { NgModule } from '@angular/core';

import { DiplomaSectionRoutingModule } from './diploma-section-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DiplomaSectionComponent } from './components/diploma-section/diploma-section.component';
import { EditTimetableComponent } from './components/timetable/edit-timetable.component';


@NgModule({
  declarations: [
    DiplomaSectionComponent,
    EditTimetableComponent
  ],
  imports: [
    SharedModule,
    DiplomaSectionRoutingModule
  ]
})
export class DiplomaSectionModule {
}
