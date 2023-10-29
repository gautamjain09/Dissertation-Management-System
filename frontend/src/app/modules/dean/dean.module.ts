import { NgModule } from '@angular/core';

import { DeanRoutingModule } from "./dean-routing.module";
import { SharedModule } from "../shared/shared.module";
import { DeanComponent } from "./components/dean/dean.component";
import {
  DeanTopicClarificationRequestsComponent
} from "./components/clarification/dean-topic-clarification-requests.component";


@NgModule({
  declarations: [
    DeanComponent,
    DeanTopicClarificationRequestsComponent,
  ],
  imports: [
    SharedModule,
    DeanRoutingModule,
  ]
})
export class DeanModule {
}
