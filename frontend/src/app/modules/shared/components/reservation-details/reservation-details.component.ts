import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Role } from '../../../../base/models/dto/role.model';
import { RoleComponent } from '../../../../base/components/role-component.directive';
import { SessionService } from '../../../../base/services/session.service';
import { UserRole } from '../../../../base/models/dto/user-role.model';
import { IdType } from '../../../../base/models/dto/id.model';
import { DiplomaSession } from '../../../../base/models/dto/diploma-session.model';
import { PermissionsService } from '../../../../base/services/permissions.service';
import { ThesesService } from '../../../../base/services/theses.service';
import { GeneralResourcesService } from '../../../../base/services/general-resources.service';
import { LabelBuilder } from '../../../../base/utils/label-builder.utils';
import { Reservation } from '../../../../base/models/dto/reservation.model';
import { ReservationMember } from '../../../../base/models/dto/reservation-member.model';
import { finalReservationStates, ReservationStatus } from '../../../../base/models/dto/reservation-status.model';
import {
  finalMemberStatuses,
  ReservationMemberStatus
} from '../../../../base/models/dto/reservation-member-status.model';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationDetailsComponent extends RoleComponent implements OnInit {
  ReservationStatus = ReservationStatus;

  form?: FormGroup;

  userRole?: UserRole;
  studentMember?: ReservationMember;
  reservation?: Reservation;
  diplomaSession?: DiplomaSession;

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
    return [Role.STUDENT, Role.LECTURER];
  }

  get reservationIdSource(): Observable<string> {
    return this.getPathParam(this.activatedRoute, 'reservationId');
  }

  ngOnInit(): void {
    this.loadReservation();
  }

  private loadReservation(): void {
    this.addSubscription(
      combineLatest([this.userRoleSource, this.reservationIdSource, this.reloadTrigger])
        .pipe(switchMap(([userRole, id]) => this.getDataSource(userRole, id)))
        .subscribe(([userRole, reservation, diplomaSession]) => {
          this.userRole = userRole;
          this.reservation = reservation;
          this.diplomaSession = diplomaSession;
          this.studentMember = reservation.reservationMembers.find(
            member => member.studentId === this.userRole!.id
          );
          this.initForm(reservation, diplomaSession);
        })
    );
  }

  private getDataSource(userRole: UserRole, reservationId: IdType): Observable<[UserRole, Reservation, DiplomaSession]> {
    return this.thesesService.getReservationForId(reservationId).pipe(
      switchMap(reservation => this.generalResourcesService.getDiplomaSessionForId(reservation.thesis.diplomaSessionId).pipe(
        map(diplomaSession => [userRole, reservation, diplomaSession] as [UserRole, Reservation, DiplomaSession])
      ))
    );
  }

  public canConfirmParticipation(): boolean {
    const isMemberSuggested = this.studentMember!.status === ReservationMemberStatus.SUGGESTED;
    const isReservationWaiting = this.reservation!.status === ReservationStatus.WAITING;
    return isMemberSuggested && isReservationWaiting;
  }

  public canStudentConfirmReservation(): boolean {
    const isMemberWilling = this.studentMember!.status === ReservationMemberStatus.WILLING;
    const isReservationAccepted = this.reservation!.status === ReservationStatus.ACCEPTED;
    return isMemberWilling && isReservationAccepted;
  }

  canAbandonReservation(): Boolean {
    const isMemberStatusNotFinal = !finalMemberStatuses.includes(this.studentMember!.status);
    const isReservationStatusNotFinal = !finalReservationStates.includes(this.reservation!.status);
    return isMemberStatusNotFinal && isReservationStatusNotFinal;
  }

  private initForm(reservation: Reservation, diplomaSession: DiplomaSession): void {
    const group: any = {
      topic: reservation.thesis.topic,
      supervisorName: LabelBuilder.forEmployee(reservation.thesis.supervisor),
      diplomaSession: LabelBuilder.forDiplomaSession(diplomaSession),
      description: reservation.thesis.description
    };
    reservation.reservationMembers.forEach(member => {
      group[this.keyForMember(member)] = LabelBuilder.forStudent(member.student);
    });

    this.form = this.formBuilder.group(group);
    this.markForCheck();
  }

  public keyForMember(member: ReservationMember): string {
    return 'member_' + member.id;
  }

  public confirmParticipation(): void {
    const actionSource = this.thesesService.confirmParticipationInReservation(
      this.studentMember!.studentId, this.reservation!.id
    );
    this.handleAction(actionSource);
  }

  public confirmMemberReservation(): void {
    const actionSource = this.thesesService.confirmMemberReservationInReservation(
      this.studentMember!.studentId, this.reservation!.id
    );
    this.handleAction(actionSource);
  }

  public abandonReservationAsMember(): void {
    const actionSource = this.thesesService.abandonReservationAsMember(
      this.studentMember!.studentId, this.reservation!.id);
    this.handleAction(actionSource);
  }

  rejectReservation(): void {
    const actionSource = this.thesesService.rejectReservation(this.reservation!.id);
    this.handleAction(actionSource);
  }

  acceptReservation(): void {
    const actionSource = this.thesesService.acceptReservation(this.reservation!.id);
    this.handleAction(actionSource);
  }

}
