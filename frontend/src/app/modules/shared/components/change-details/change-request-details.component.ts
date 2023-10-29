import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Role } from '../../../../base/models/dto/role.model';
import { RoleComponent } from '../../../../base/components/role-component.directive';
import { RequestsService } from '../../../../base/services/requests.service';
import { SessionService } from '../../../../base/services/session.service';
import { ChangeRequest } from '../../../../base/models/dto/change-request.model';
import { UserRole } from '../../../../base/models/dto/user-role.model';
import { LabelBuilder } from '../../../../base/utils/label-builder.utils';
import { GeneralResourcesService } from '../../../../base/services/general-resources.service';
import { DiplomaSession } from '../../../../base/models/dto/diploma-session.model';
import { filterRoles } from '../../../../core/tools/filter-roles';
import { PermissionsService } from '../../../../base/services/permissions.service';

@Component({
  selector: 'app-change-request-details',
  templateUrl: './change-request-details.component.html',
  styleUrls: ['./change-request-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeRequestDetailsComponent extends RoleComponent implements OnInit {

  form?: FormGroup;

  userRole?: UserRole;
  request?: ChangeRequest;
  diplomaSession?: DiplomaSession;
  canProgramCommitteeConsiderRequest?: boolean;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly activatedRoute: ActivatedRoute,
              private readonly requestsService: RequestsService,
              private readonly permissionsService: PermissionsService,
              private readonly generalResourcesService: GeneralResourcesService,
              sessionService: SessionService,
              changeDetector: ChangeDetectorRef) {
    super(sessionService, changeDetector);
  }

  get roles(): Role[] {
    return [Role.STUDENT, Role.PROGRAM_COMMITTEE_MEMBER];
  }

  get requestId(): Observable<string> {
    return this.getPathParam(this.activatedRoute, 'requestId');
  }

  ngOnInit(): void {
    this.loadRequest();
    this.checkButtonsAvailability();
  }

  private loadRequest(): void {
    this.addSubscription(
      this.getDataSource().subscribe(([userRole, request, diplomaSession]) => {
        this.request = request;
        this.userRole = userRole;
        this.diplomaSession = diplomaSession;
        this.initFormData(request, diplomaSession);
      })
    );
  }

  private getDataSource(): Observable<[UserRole, ChangeRequest, DiplomaSession]> {
    return combineLatest([this.userRoleSource, this.requestId, this.reloadTrigger]).pipe(
      switchMap(([userRole, id]) => this.requestsService.getChangeRequestForId(id).pipe(
        switchMap(request => this.generalResourcesService.getDiplomaSessionForId(request.newThesis.diplomaSessionId).pipe(
          map(diplomaSession => ([userRole, request, diplomaSession] as [UserRole, ChangeRequest, DiplomaSession]))
        ))
      ))
    );
  }

  private checkButtonsAvailability(): void {
    this.addSubscription(combineLatest([
      this.userRoleSource.pipe(filterRoles([Role.PROGRAM_COMMITTEE_MEMBER])),
      this.requestId,
      this.reloadTrigger
    ]).pipe(switchMap(([userRole, id]) =>
      this.permissionsService.canCommitteeConsiderChangeRequest(userRole.id, id)
    )).subscribe(canConsiderRequest => {
      this.canProgramCommitteeConsiderRequest = canConsiderRequest;
      this.markForCheck();
    }));
  }

  private initFormData(request: ChangeRequest, diplomaSession: DiplomaSession): void {
    this.form = this.formBuilder.group({
      diplomaSession: [LabelBuilder.forDiplomaSession(diplomaSession)],
      numberOfStudents: [request.previousThesis.numberOfStudents],
      previousTopic: [request.previousThesis.topic],
      previousDescription: [request.previousThesis.description],
      previousSupervisor: [LabelBuilder.forEmployee(request.previousThesis.supervisor)],
      newTopic: [request.newThesis.topic],
      newDescription: [request.newThesis.description],
      newSupervisor: [LabelBuilder.forEmployee(request.newThesis.supervisor)]
    });
    this.markForCheck();
  }

  public rejectRequest(): void {
    const actionSource = this.requestsService.rejectChangeRequestWithCommitteeMember(this.userRole!.id, this.request!.id);
    this.handleAction(actionSource);
  }

  public approveRequest(): void {
    const actionSource = this.requestsService.approveChangeRequestWithCommitteeMember(this.userRole!.id, this.request!.id);
    this.handleAction(actionSource);
  }

}
