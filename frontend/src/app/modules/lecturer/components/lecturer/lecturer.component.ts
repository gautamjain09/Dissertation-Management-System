import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavItem } from "../../../shared/models/nav-item.model";

@Component({
  selector: 'app-lecturer',
  templateUrl: '../../../shared/components/body-framework/body-framework.component.html',
  styleUrls: ['./lecturer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LecturerComponent {

  public navItems: NavItem[] = [
    { path: '/lecturer/topic', nameKey: 'Sidebar.Lecturer.ThesisTopics' },
    { path: '/lecturer/reservations', nameKey: 'Sidebar.Lecturer.ThesisTopicsReservations' }
  ];

}
