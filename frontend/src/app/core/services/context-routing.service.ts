import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Role } from '../../base/models/dto/role.model';
import { Dictionary } from '../models/dictionary.model';
import { CleanableService } from './cleanable.service';
import { Cleanable } from '../components/cleanable.directive';
import { combineLatest, distinctUntilChanged, filter, Observable, skip } from 'rxjs';
import { isNil } from 'lodash-es';
import { filterExists } from '../tools/filter-exists';
import { first, map } from 'rxjs/operators';
import { firstItem } from '../tools/first-item';
import { UserRole } from '../../base/models/dto/user-role.model';
import { UserService } from '../../base/services/user.service';
import { SessionService } from '../../base/services/session.service';


@Injectable({
  providedIn: 'root'
})
export class ContextRoutingService implements CleanableService {

  private loginRoute = '/login';
  private routeByRole: Dictionary<string> = {
    [Role.DEAN]: '/dean',
    [Role.ADMIN]: '/admin',
    [Role.STUDENT]: '/student',
    [Role.LECTURER]: '/lecturer',
    [Role.COORDINATOR]: '/coordinator',
    [Role.DIPLOMA_SECTION_MEMBER]: '/diploma-section',
    [Role.PROGRAM_COMMITTEE_MEMBER]: '/program-committee'
  };

  constructor(private readonly sessionService: SessionService,
              private readonly userService: UserService,
              private readonly router: Router) {
  }

  private getRouterEvents(): Observable<RouterEvent> {
    return this.router.events.pipe(filter(e => e instanceof RouterEvent)) as Observable<RouterEvent>;
  }

  init(cleanable: Cleanable, changeDetector: ChangeDetectorRef): void {
    const contextRole = this.sessionService.selectContextRole().pipe(skip(1));
    cleanable.addSubscription(
      combineLatest([contextRole.pipe(map(ur => ur?.role)), this.getRouterEvents()])
        .pipe(distinctUntilChanged(([role1], [role2]) => role1 === role2))
        .subscribe(([role, event]) => {
          const contextPath = (role && this.routeByRole[role]) || this.loginRoute;
          if (isNil(event) || !event!.url.startsWith(contextPath)) {
            this.router.navigate([contextPath]).then();
          }
        })
    );
  }

  calculateNewUserRole(): Observable<UserRole | undefined> {
    return this.userService.getUserRolesWaitIfInProgress()
      .pipe(filterExists(), first(), map(roles => firstItem(roles)));
  }

}
