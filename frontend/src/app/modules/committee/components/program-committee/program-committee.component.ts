import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavItem } from '../../../shared/models/nav-item.model';

@Component({
  selector: 'app-dean',
  templateUrl: '../../../shared/components/body-framework/body-framework.component.html',
  styleUrls: ['./program-committee.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramCommitteeComponent {

  public navItems: NavItem[] = [
    { path: '/program-committee/topic', nameKey: 'Sidebar.ProgramCommittee.ProposedTopics' },
    { path: '/program-committee/change-requests', nameKey: 'Sidebar.ProgramCommittee.TopicChangeRequests' }
  ];

}
