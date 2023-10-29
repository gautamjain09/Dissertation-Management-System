import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavItem } from '../../../shared/models/nav-item.model';

@Component({
  selector: 'app-admin',
  templateUrl: '../../../shared/components/body-framework/body-framework.component.html',
  styleUrls: ['./admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {

  public navItems: NavItem[] = [
    { path: '/admin/notifications', nameKey: 'Sidebar.Admin.Notifications' }
  ];

}
