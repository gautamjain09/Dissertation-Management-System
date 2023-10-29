import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { Role } from '../../base/models/dto/role.model';
import { Injectable } from '@angular/core';
import { UserRole } from '../../base/models/dto/user-role.model';
import { isEmpty, isNil } from 'lodash-es';
import { isNotNil } from '../tools/is-not-nil';
import { UserService } from '../../base/services/user.service';
import { SessionService } from '../../base/services/session.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivateChild, CanActivate {

  protected constructor(private readonly router: Router,
                        private readonly userService: UserService,
                        private readonly sessionService: SessionService) {
  }

  get requiredRole(): Role {
    return Role.STUDENT;
  };

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const routeAllowedRoles = route.data['allowedRoles'];
    return this.check(routeAllowedRoles && [routeAllowedRoles]);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const allowedRolesPath: Role[][] = childRoute.pathFromRoot.reduce((roles: Role[][], state) => {
      const stateAllowedRoles: Role[] = state.data['allowedRoles'];
      if (isNotNil(stateAllowedRoles)) {
        roles.push(stateAllowedRoles);
      }
      return roles;
    }, []);
    return this.check(allowedRolesPath);
  }

  private check(pathAllowedRoles: Role[][]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.sessionService.selectContextRole().pipe(
      first(), switchMap(userRole => {
        if (this.testRoles(userRole, pathAllowedRoles)) {
          return of(true);
        }
        return this.checkIfOtherRolesMatch(pathAllowedRoles);
      })
    );
  }

  private checkIfOtherRolesMatch(pathAllowedRoles: Role[][]): Observable<boolean> {
    return this.userService.getUserRolesWaitIfInProgress().pipe(
      first(),
      map((roles?) => roles?.find(role => this.testRoles(role, pathAllowedRoles))),
      tap(role => isNotNil(role) && this.sessionService.setContextRole(role)),
      map(role => isNotNil(role))
    );
  }

  private testRoles(userRole?: UserRole, pathAllowedRoles?: Role[][]): boolean {
    if (isEmpty(pathAllowedRoles)) {
      return true;
    }
    if (isNil(userRole)) {
      return false;
    }
    return pathAllowedRoles!.every(allowedRoles => allowedRoles.includes(userRole.role));
  }

}
