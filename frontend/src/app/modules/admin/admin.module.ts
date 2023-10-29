import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './components/admin/admin.component';
import { AdminNotificationsComponent } from './components/notifications/admin-notifications.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminNotificationsComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule {
}
