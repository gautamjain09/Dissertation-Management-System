import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavItem } from '../../../shared/models/nav-item.model';

@Component({
  selector: 'app-diploma-section',
  templateUrl: '../../../shared/components/body-framework/body-framework.component.html',
  styleUrls: ['./diploma-section.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiplomaSectionComponent {

  public navItems: NavItem[] = [
    { path: '/diploma-section/timetable', nameKey: 'Sidebar.DiplomaSection.Timetables' }
  ];

}
