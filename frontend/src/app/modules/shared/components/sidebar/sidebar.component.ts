import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavItem } from '../../models/nav-item.model';
import { AuthStoreService } from '../../../../base/services/store/auth-store.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {

  @Input()
  public navItems: NavItem[] = [];

  constructor(private readonly authStoreService: AuthStoreService) {
  }

  public logout(): void {
    this.authStoreService.logout();
  }

}
