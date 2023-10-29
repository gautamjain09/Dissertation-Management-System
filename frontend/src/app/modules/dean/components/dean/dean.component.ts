import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavItem } from "../../../shared/models/nav-item.model";

@Component({
  selector: 'app-dean',
  templateUrl: '../../../shared/components/body-framework/body-framework.component.html',
  styleUrls: ['./dean.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeanComponent {

  public navItems: NavItem[] = [
    { path: '/dean/clarification', nameKey: 'Sidebar.Dean.ClarificationRequests' }
  ];

}
