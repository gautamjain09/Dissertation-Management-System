import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppLanguage } from '../../../core/models/app-language.model';
import { FormControl } from '@angular/forms';
import { BaseComponent } from '../../../core/components/base-component.directive';
import { UserRole } from '../../../base/models/dto/user-role.model';
import { UserService } from '../../../base/services/user.service';
import { SessionService } from '../../../base/services/session.service';
import { switchMap, tap } from 'rxjs/operators';
import { DiplomaSession } from '../../../base/models/dto/diploma-session.model';
import { Role } from '../../../base/models/dto/role.model';
import { GeneralResourcesService } from '../../../base/services/general-resources.service';
import { map, Observable } from 'rxjs';
import { filterExists } from '../../../core/tools/filter-exists';
import { FieldOfStudy } from '../../../base/models/dto/field-of-study.model';
import { groupBy, isNil } from 'lodash-es';
import { IdType } from '../../../base/models/dto/id.model';
import { Dictionary } from '../../../core/models/dictionary.model';
import { firstItem } from '../../../core/tools/first-item';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent extends BaseComponent implements OnInit {
  AppLanguage = AppLanguage;

  selectedFosId?: IdType;
  selectedUserRole?: UserRole;

  userRoles?: UserRole[];
  fieldsOfStudy?: FieldOfStudy[];
  dsByFosId?: Dictionary<DiplomaSession[]>;

  languageControl = new FormControl();
  roleContextControl = new FormControl();
  fieldOfStudyContextControl = new FormControl();
  diplomaSessionContextControl = new FormControl();

  get diplomaSessions(): DiplomaSession[] | undefined {
    if (isNil(this.dsByFosId) || isNil(this.selectedFosId)) {
      return undefined;
    }
    return this.dsByFosId[this.selectedFosId];
  }


  constructor(private readonly userService: UserService,
              private readonly sessionService: SessionService,
              private readonly generalResourcesService: GeneralResourcesService,
              changeDetector: ChangeDetectorRef) {
    super(changeDetector);
  }

  roleToId(role?: UserRole): string {
    return `${role?.role} ${role?.id}`;
  }

  ngOnInit(): void {
    this.initLanguage();
    this.initContext();
  }

  private initLanguage() {
    this.addSubscription(
      this.sessionService.getLanguage().subscribe(language => {
        this.languageControl.setValue(language, { emitEvent: false });
        this.markForCheck();
      })
    );

    this.addSubscription(
      this.languageControl.valueChanges.subscribe(
        lang => this.sessionService.setLanguage(lang)
      )
    );
  }

  private initContext() {
    this.addSubscription(
      this.sessionService.selectContext().subscribe(context => {
        this.selectedFosId = context?.fieldOfStudy?.id;
        this.selectedUserRole = context?.userRole;
        this.roleContextControl.setValue(this.roleToId(context?.userRole), { emitEvent: false });
        this.diplomaSessionContextControl.setValue(context?.diplomaSession?.id, { emitEvent: false });
        this.fieldOfStudyContextControl.setValue(context?.fieldOfStudy?.id, { emitEvent: false });
        this.markForCheck();
      })
    );

    this.addSubscription(
      this.roleContextControl.valueChanges.subscribe(roleId => {
        const role = this.userRoles?.find(role => this.roleToId(role) === roleId);
        this.sessionService.setContextRole(role);
      })
    );

    this.addSubscription(
      this.diplomaSessionContextControl.valueChanges.pipe(
        map(dsId => this.diplomaSessions?.find(ds => ds.id === dsId)), filterExists()
      ).subscribe(diplomaSession => this.sessionService.setContextDiplomaSession(diplomaSession))
    );

    this.addSubscription(
      this.fieldOfStudyContextControl.valueChanges.pipe(
        map(fosId => firstItem(this.dsByFosId?.[fosId])), filterExists()
      ).subscribe(diplomaSession => this.sessionService.setContextDiplomaSession(diplomaSession))
    );

    this.addSubscription(
      this.sessionService.selectContextRole().pipe(
        tap(() => {
          this.fieldsOfStudy = undefined;
          this.dsByFosId = undefined;
        }),
        filterExists(),
        switchMap(userRole => userRole.role === Role.STUDENT
          ? this.getDiplomaSessionsForStudent(userRole.id)
          : this.getDiplomaSessionsForEmployee(userRole.id))
      ).subscribe(diplomaSessions => {
        this.dsByFosId = groupBy(diplomaSessions, ds => ds.fieldOfStudy.id);
        this.fieldsOfStudy = Object.values(this.dsByFosId).map(dss => firstItem(dss)!.fieldOfStudy);
        this.markForCheck();
      })
    );

    this.addSubscription(
      this.userService.getCurrentUser().subscribe(user => {
        this.userRoles = user?.roles;
        this.markForCheck();
      })
    );
  }

  private getDiplomaSessionsForStudent(studentId: IdType): Observable<DiplomaSession[]> {
    return this.userService.getStudentForId(studentId).pipe(switchMap(
      student => this.generalResourcesService.getDiplomaSessionsForFieldOfStudy(student.fieldOfStudyId)
    ));
  }

  private getDiplomaSessionsForEmployee(employeeId: IdType): Observable<DiplomaSession[]> {
    return this.userService.getEmployeeForId(employeeId).pipe(switchMap(
      employee => this.generalResourcesService.getDiplomaSessionsForDepartment(employee.departmentId)
    ));
  }


}
