import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavItem } from "../../../shared/models/nav-item.model";

@Component({
  selector: 'app-coordinator',
  templateUrl: '../../../shared/components/body-framework/body-framework.component.html',
  styleUrls: ['./coordinator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoordinatorComponent {

  public navItems: NavItem[] = [
    { path: '/coordinator/topic', nameKey: 'Sidebar.Coordinator.ThesisTopics' },
  ];

}
