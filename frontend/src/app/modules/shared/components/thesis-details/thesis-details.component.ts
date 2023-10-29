import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, map, NEVER, Observable, of, switchMap } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Role } from '../../../../base/models/dto/role.model';
import { RoleComponent } from '../../../../base/components/role-component.directive';
import { SessionService } from '../../../../base/services/session.service';
import { UserRole } from '../../../../base/models/dto/user-role.model';
import { Thesis } from '../../../../base/models/dto/thesis.model';
import { ThesesService } from '../../../../base/services/theses.service';
import { IdType } from '../../../../base/models/dto/id.model';
import { GeneralResourcesService } from '../../../../base/services/general-resources.service';
import { DiplomaSession } from '../../../../base/models/dto/diploma-session.model';
import { LabelBuilder } from '../../../../base/utils/label-builder.utils';
import { PermissionsService } from '../../../../base/services/permissions.service';
import { isNotNil } from '../../../../core/tools/is-not-nil';
import { ThesisStatus } from '../../../../base/models/dto/topic-status.model';
import { EmployeeRole } from '../../../../base/models/dto/employee-role.model';
import { Dictionary } from '../../../../core/models/dictionary.model';
import { AppValidators } from '../../../../base/utils/validators.utils';
import { Context } from '../../../../base/models/context.model';
import { CorrectThesis, CorrectThesisChanges } from '../../../../base/models/dto/post/correct-thesis.model';

const FORM_KEY = {
  TOPIC: 'topic',
  SUPERVISOR: 'supervisorName',
  DIPLOMA_SESSION: 'diplomaSession',
  NUMBER_OF_STUDENTS: 'numberOfStudents',
  DESCRIPTION: 'description',
  COORDINATOR_COMMENT: 'coordinatorComment'
};


@Component({
  selector: 'app-thesis-details',
  templateUrl: './thesis-details.component.html',
  styleUrls: ['./thesis-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThesisDetailsComponent extends RoleComponent implements OnInit {

  FORM_KEY = FORM_KEY;
  ThesisStatus = ThesisStatus;

  static HEADER_KEY = 'headerKey';
  headerKey = 'ThesisDetails.Header';

  form?: FormGroup;

  thesis?: Thesis;
  userRole?: UserRole;
  diplomaSession?: DiplomaSession;

  canLecturerSubmit?: boolean;
  canStudentReserve?: boolean;
  canCoordinatorConsiderThesis?: boolean;
  canCommitteeMemberConsiderThesis?: boolean;


  constructor(private readonly router: Router,
              private readonly formBuilder: FormBuilder,
              private readonly deadlinesService: PermissionsService,
              private readonly thesesService: ThesesService,
              private readonly generalResourcesService: GeneralResourcesService,
              private readonly activatedRoute: ActivatedRoute,
              sessionService: SessionService,
              changeDetector: ChangeDetectorRef) {
    super(sessionService, changeDetector);
  }

  get roles(): Role[] {
    return [Role.STUDENT, Role.COORDINATOR, Role.PROGRAM_COMMITTEE_MEMBER, Role.LECTURER];
  }

  get thesisIdSource(): Observable<string> {
    return this.getPathParam(this.activatedRoute, 'thesisId');
  }

  isWarningVisible(role: Role, canDoSth?: boolean): boolean {
    return this.userRole?.role === role && isNotNil(canDoSth) && !canDoSth;
  }

  ngOnInit(): void {
    this.loadThesis();
    this.initHeaderLabel();
    this.checkButtonAvailability();
  }

  private loadThesis(): void {
    this.addSubscription(
      combineLatest([this.userRoleSource, this.thesisIdSource, this.reloadTrigger])
        .pipe(switchMap(([userRole, thesisId]) => this.getDataSource(userRole, thesisId)))
        .subscribe(([userRole, thesis, diplomaSession]) => {
          this.userRole = userRole;
          this.thesis = thesis;
          this.diplomaSession = diplomaSession;
          this.setFormData(userRole, thesis, diplomaSession);
        })
    );
  }

  private getDataSource(userRole: UserRole, requestId: IdType): Observable<[UserRole, Thesis, DiplomaSession]> {
    return this.thesesService.getThesisForId(requestId).pipe(
      switchMap(thesis => this.generalResourcesService.getDiplomaSessionForId(thesis.diplomaSessionId).pipe(
        map(diplomaSession => [userRole, thesis, diplomaSession] as [UserRole, Thesis, DiplomaSession])
      ))
    );
  }

  private checkButtonAvailability(): void {
    this.addSubscription(
      combineLatest([this.contextSource, this.thesisIdSource, this.reloadTrigger]).pipe(
        switchMap(([contextSource, thesisId]) => {
          switch (contextSource.userRole.role) {
            case Role.STUDENT :
              return this.checkForStudent(contextSource, thesisId);
            case Role.COORDINATOR :
              return this.checkForCoordinator(contextSource.userRole.id, thesisId);
            case Role.PROGRAM_COMMITTEE_MEMBER :
              return this.checkForCommitteeMember(contextSource.userRole.id, thesisId);
            case Role.LECTURER :
              return this.checkForLecturer(contextSource);
          }
          return NEVER;
        })
      ).subscribe()
    );
  }

  checkForStudent(studentContext: Context, thesisId: IdType): Observable<void> {
    return this.deadlinesService.canReserveThesisWithId(studentContext, thesisId).pipe(
      map(canReserve => {
        this.canStudentReserve = canReserve;
        this.markForCheck();
      })
    );
  }

  checkForCoordinator(coordinatorId: IdType, thesisId: IdType): Observable<void> {
    return this.deadlinesService.canCoordinatorConsiderThesis(coordinatorId, thesisId).pipe(
      map(canConsider => {
        this.canCoordinatorConsiderThesis = canConsider;
        this.markForCheck();
      })
    );
  }

  checkForCommitteeMember(committeeMemberId: IdType, thesisId: IdType): Observable<void> {
    return this.deadlinesService.canCommitteeMemberConsiderThesis(committeeMemberId, thesisId).pipe(
      map(canConsider => {
        this.canCommitteeMemberConsiderThesis = canConsider;
        this.markForCheck();
      })
    );
  }

  checkForLecturer(context: Context): Observable<void> {
    this.canLecturerSubmit = this.deadlinesService.canLectureSubmitThesisWithSameDiplomaSession(context.diplomaSession!);
    this.markForCheck();
    return of();
  }

  private setFormData(userRole: UserRole, thesis: Thesis, diplomaSession: DiplomaSession): void {
    const group = this.getGroupForRole(userRole, thesis);
    this.form = this.formBuilder.group(group);
    this.form.patchValue(this.prepareDataToPatch(thesis, diplomaSession));
    this.markForCheck();
  }

  private getGroupForRole(userRole: UserRole, thesis: Thesis): Dictionary<any> {
    switch (userRole.role) {
      case EmployeeRole.COORDINATOR:
        return this.getGroupForCoordinator(thesis);
      case EmployeeRole.LECTURER:
        return this.getGroupForLecturer(thesis);
      default:
        return this.getDisabledGroup();
    }
  }

  prepareDataToPatch(thesis: Thesis, diplomaSession: DiplomaSession): object {
    return {
      [FORM_KEY.TOPIC]: thesis.topic,
      [FORM_KEY.SUPERVISOR]: LabelBuilder.forEmployee(thesis.supervisor),
      [FORM_KEY.DIPLOMA_SESSION]: LabelBuilder.forDiplomaSession(diplomaSession),
      [FORM_KEY.NUMBER_OF_STUDENTS]: thesis.numberOfStudents,
      [FORM_KEY.DESCRIPTION]: thesis.description,
      [FORM_KEY.COORDINATOR_COMMENT]: thesis.coordinatorComment
    };
  }

  getGroupForCoordinator(thesis: Thesis): Dictionary<any> {
    const isCommentDisabled: boolean = thesis.status !== ThesisStatus.WAITING;
    return {
      [FORM_KEY.TOPIC]: [{ value: undefined, disabled: true }],
      [FORM_KEY.SUPERVISOR]: [{ value: undefined, disabled: true }],
      [FORM_KEY.DIPLOMA_SESSION]: [{ value: undefined, disabled: true }],
      [FORM_KEY.NUMBER_OF_STUDENTS]: [{ value: undefined, disabled: true }],
      [FORM_KEY.DESCRIPTION]: [{ value: undefined, disabled: true }],
      [FORM_KEY.COORDINATOR_COMMENT]: [
        { value: undefined, disabled: isCommentDisabled },
        AppValidators.coordinatorCommentValidator
      ]
    };
  }

  getGroupForLecturer(thesis: Thesis): Dictionary<any> {
    const isCorrectionMode = thesis.status === ThesisStatus.TO_CORRECT || thesis.status === ThesisStatus.WAITING;
    return {
      [FORM_KEY.TOPIC]: [{ value: undefined, disabled: !isCorrectionMode }, AppValidators.topicValidator],
      [FORM_KEY.SUPERVISOR]: [{ value: undefined, disabled: true }],
      [FORM_KEY.DIPLOMA_SESSION]: [{ value: undefined, disabled: true }],
      [FORM_KEY.NUMBER_OF_STUDENTS]: [
        { value: undefined, disabled: !isCorrectionMode },
        AppValidators.numberOfStudentsValidator
      ],
      [FORM_KEY.DESCRIPTION]: [{ value: undefined, disabled: !isCorrectionMode }, AppValidators.descriptionValidator],
      [FORM_KEY.COORDINATOR_COMMENT]: [{ value: undefined, disabled: true }]
    };
  }

  getDisabledGroup(): Dictionary<any> {
    return {
      [FORM_KEY.TOPIC]: [{ value: undefined, disabled: true }],
      [FORM_KEY.SUPERVISOR]: [{ value: undefined, disabled: true }],
      [FORM_KEY.DIPLOMA_SESSION]: [{ value: undefined, disabled: true }],
      [FORM_KEY.NUMBER_OF_STUDENTS]: [{ value: undefined, disabled: true }],
      [FORM_KEY.DESCRIPTION]: [{ value: undefined, disabled: true }],
      [FORM_KEY.COORDINATOR_COMMENT]: [{ value: undefined, disabled: true }]
    };
  }

  approveThesisWithCoordinator(): void {
    const actionSource = this.thesesService.approveThesisWithCoordinator(this.userRole!.id, this.thesis!.id);
    this.handleAction(actionSource);
  }

  requestForThesisCorrectionsWithCoordinator(): void {
    const comment = this.form!.value['coordinatorComment'];
    const payload = { comment, thesisId: this.thesis!.id };
    const actionSource = this.thesesService.requestForThesisCorrectionsWithCoordinator(this.userRole!.id, payload);
    this.handleAction(actionSource);
  }

  rejectThesisWithCoordinator(): void {
    const comment = this.form!.value['coordinatorComment'];
    const payload = { comment, thesisId: this.thesis!.id };
    const actionSource = this.thesesService.rejectThesisWithCoordinator(this.userRole!.id, payload);
    this.handleAction(actionSource);
  }


  rejectThesisWithCommitteeMember(): void {
    const payload = { thesisId: this.thesis!.id };
    const actionSource = this.thesesService.rejectThesisWithCommitteeMember(this.userRole!.id, payload);
    this.handleAction(actionSource);
  }

  approveThesisWithCommitteeMember(): void {
    const actionSource = this.thesesService.approveThesisWithCommitteeMember(this.userRole!.id, this.thesis!.id);
    this.handleAction(actionSource);
  }

  correctThesisWithLecturer(): void {
    const formData = this.form!.value;
    const changes = new CorrectThesisChanges();
    changes.numberOfStudents = formData[FORM_KEY.NUMBER_OF_STUDENTS];
    changes.topic = formData[FORM_KEY.TOPIC];
    changes.description = formData[FORM_KEY.DESCRIPTION];
    const payload = new CorrectThesis();
    payload.thesisId = this.thesis!.id;
    payload.changes = changes;
    const actionSource = this.thesesService.correctThesisWithLecturer(payload);
    this.handleAction(actionSource);
  }

  rejectThesisWithLecturer(): void {
    const actionSource = this.thesesService.rejectThesisWithLecturer(this.thesis!.id);
    this.handleAction(actionSource);
  }

  acceptThesisWithLecturer(): void {
    const actionSource = this.thesesService.acceptThesisWithLecturer(this.thesis!.id);
    this.handleAction(actionSource);
  }

  public reserveTopic(): void {
    this.router.navigate(['/student/reservations/create', this.thesis!.id]).then();
  }

  deleteProposition(): void {
    const actionSource = this.thesesService.deleteProposition(this.thesis!.id);
    this.addSubscription(actionSource.subscribe({
      next: () => this.router.navigate(['/student/topic-propositions']).then(),
      error: () => this.showError()
    }));
  }

  isCoordinatorCommentVisible(): boolean {
    return this.thesis?.status === ThesisStatus.TO_CORRECT
      || this.thesis?.status === ThesisStatus.WAITING && this.userRole?.role === Role.COORDINATOR;
  }

  private initHeaderLabel(): void {
    this.addSubscription(
      this.activatedRoute.data.subscribe(data => {
        const headerKey = data[ThesisDetailsComponent.HEADER_KEY];
        if (isNotNil(headerKey)) {
          this.headerKey = headerKey;
          this.markForCheck();
        }
      })
    );
  }


}
