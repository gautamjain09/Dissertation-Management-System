import { NgModule } from '@angular/core';

import { CoordinatorRoutingModule } from './coordinator-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CoordinatorTopicsComponent } from './components/topics/coordinator-topics.component';
import { CoordinatorComponent } from './components/coordinator/coordinator.component';


@NgModule({
  declarations: [
    CoordinatorComponent,
    CoordinatorTopicsComponent
  ],
  imports: [
    SharedModule,
    CoordinatorRoutingModule
  ]
})
export class CoordinatorModule {
}
