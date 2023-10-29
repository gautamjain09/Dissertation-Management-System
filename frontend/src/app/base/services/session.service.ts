import { ChangeDetectorRef, Injectable } from '@angular/core';
import { map, Observable, of, Subject, switchMap } from 'rxjs';
import { SessionStoreService } from './store/session-store.service';
import { UserRole } from '../models/dto/user-role.model';
import { AppLanguage } from '../../core/models/app-language.model';
import { Context } from '../models/context.model';
import { DiplomaSession } from '../models/dto/diploma-session.model';
import { Role } from '../models/dto/role.model';
import { UserStoreService } from './store/user-store.service';
import { GeneralResourcesStoreService } from './store/general-store.service';
import { LoadDiplomaSessionsActionOptions } from '../store/general/general.actions';
import { CleanableService } from '../../core/services/cleanable.service';
import { Cleanable } from '../../core/components/cleanable.directive';
import { isNil, maxBy } from 'lodash-es';
import { first } from 'rxjs/operators';
import { filterExists } from '../../core/tools/filter-exists';

@Injectable({
  providedIn: 'root'
})
export class SessionService implements CleanableService {

  private userRoleSource = new Subject<UserRole | undefined>();
  private diplomaSessionSource = new Subject<DiplomaSession>();

  constructor(private readonly userStoreService: UserStoreService,
              private readonly sessionStoreService: SessionStoreService,
              private readonly generalResourcesStoreService: GeneralResourcesStoreService) {
  }

  init(cleanable: Cleanable, changeDetector: ChangeDetectorRef): void {
    cleanable.addSubscription(this.userRoleSource.pipe(
      switchMap(userRole => isNil(userRole) ? of(undefined)
        : userRole!.role === Role.STUDENT
          ? this.buildContextForStudentUserRole(userRole).pipe(first())
          : this.buildContextForEmployeeUserRole(userRole).pipe(first())
      )).subscribe(context => this.sessionStoreService.setContext(context))
    );

    cleanable.addSubscription(this.diplomaSessionSource.pipe(
      switchMap(diplomaSession => this.selectContext().pipe(filterExists(),
        switchMap(context => isNil(context.userRole) ? of(undefined)
          : context.userRole.role === Role.STUDENT
            ? this.buildContextForStudentUserRoleAndDiplomaSession(context.userRole, diplomaSession)
            : this.buildContextForEmployeeUserRoleAndDiplomaSession(context.userRole, diplomaSession)
        ), first()
      ))
    ).subscribe(context => this.sessionStoreService.setContext(context)));
  }

  private buildContextForStudentUserRole(userRole: UserRole): Observable<Context> {
    return this.userStoreService.getStudentForId(userRole.id).pipe(
      switchMap(student => {
        const options = LoadDiplomaSessionsActionOptions.forFieldOfStudy(student.fieldOfStudyId);
        // download only one is enough, but we have not api for that
        return this.generalResourcesStoreService.getDiplomaSessionsForKey(options)
          .pipe(map(dss => this.buildContext(userRole, dss)));
      })
    );
  }

  private buildContextForEmployeeUserRole(userRole: UserRole): Observable<Context> {
    return this.userStoreService.getEmployeeForId(userRole.id).pipe(
      switchMap(employee => {
        const options = LoadDiplomaSessionsActionOptions.forDepartment(employee.departmentId);
        // download only one is enough, but we have not api for that
        return this.generalResourcesStoreService.getDiplomaSessionsForKey(options)
          .pipe(map(dss => this.buildContext(userRole, dss)));
      })
    );
  }

  private buildContextForStudentUserRoleAndDiplomaSession(userRole: UserRole, diplomaSession: DiplomaSession): Observable<Context | undefined> {
    return this.userStoreService.getStudentForId(userRole.id).pipe(map(
      student => student.fieldOfStudyId === diplomaSession.fieldOfStudy.id
        ? this.buildContext(userRole, [diplomaSession]) : undefined
    ));
  }

  private buildContextForEmployeeUserRoleAndDiplomaSession(userRole: UserRole, diplomaSession: DiplomaSession): Observable<Context | undefined> {
    return this.userStoreService.getEmployeeForId(userRole.id).pipe(map(
      employee => employee.departmentId === diplomaSession.fieldOfStudy.departmentId
        ? this.buildContext(userRole, [diplomaSession]) : undefined
    ));
  }

  private buildContext(userRole: UserRole, diplomaSessions: DiplomaSession[]): Context {
    const diplomaSession = maxBy(diplomaSessions, ds => ds.id);
    return { userRole, diplomaSession, fieldOfStudy: diplomaSession?.fieldOfStudy };
  }

  public getLanguage(): Observable<AppLanguage> {
    return this.sessionStoreService.getLanguage();
  }

  public setContextRole(userRole?: UserRole): void {
    this.userRoleSource.next(userRole);
  }

  public setContextDiplomaSession(diplomaSession: DiplomaSession): void {
    this.diplomaSessionSource.next(diplomaSession);
  }

  public setLanguage(language: AppLanguage): void {
    this.sessionStoreService.setLanguage(language);
  }

  public selectContextRole(): Observable<UserRole | undefined> {
    return this.sessionStoreService.selectSessionContextRole();
  }

  public selectContext(): Observable<Context | undefined> {
    return this.sessionStoreService.selectSessionContext();
  }

  public selectError(): Observable<any> {
    return this.sessionStoreService.selectError();
  }

}
