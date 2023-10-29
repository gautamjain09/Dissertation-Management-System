import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { Role } from '../../base/models/dto/role.model';
import { Injectable } from '@angular/core';
import { AuthStoreService } from '../../base/services/store/auth-store.service';
import { ContextRoutingService } from '../services/context-routing.service';
import { SessionService } from '../../base/services/session.service';

@Injectable({
  providedIn: 'root'
})
export class LoginPageGuard implements CanActivate {

  protected constructor(private readonly authStoreService: AuthStoreService,
                        private readonly sessionService: SessionService,
                        private readonly contextRoutingService: ContextRoutingService) {
  }

  get requiredRole(): Role {
    return Role.STUDENT;
  };

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authStoreService.isUserLoggedIn().pipe(
      first(), switchMap(isLogged => isLogged ? this.redirectWithContext() : of(true))
    );
  }

  private redirectWithContext(): Observable<boolean> {
    return this.contextRoutingService.calculateNewUserRole()
      .pipe(tap(role => this.sessionService.setContextRole(role)), map(() => false));
  }

}
