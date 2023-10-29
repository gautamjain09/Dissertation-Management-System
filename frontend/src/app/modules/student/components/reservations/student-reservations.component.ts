import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Thesis } from '../../../../base/models/dto/thesis.model';
import { Router } from '@angular/router';
import { Reservation } from '../../../../base/models/dto/reservation.model';
import { PermissionsService } from '../../../../base/services/permissions.service';
import { ThesesService } from '../../../../base/services/theses.service';
import { SessionService } from '../../../../base/services/session.service';
import { Role } from '../../../../base/models/dto/role.model';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { RoleComponent } from '../../../../base/components/role-component.directive';
import { UserService } from '../../../../base/services/user.service';

@Component({
  selector: 'app-student-reservations',
  templateUrl: './student-reservations.component.html',
  styleUrls: ['./student-reservations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentReservationsComponent extends RoleComponent implements OnInit {

  theses?: Thesis[];
  reservations?: Reservation[];
  activeReservation?: Reservation;

  canCreateNew = false;

  constructor(private readonly deadlinesService: PermissionsService,
              private readonly thesesService: ThesesService,
              private readonly userService: UserService,
              private readonly router: Router,
              sessionService: SessionService,
              changeDetector: ChangeDetectorRef) {
    super(sessionService, changeDetector);
  }

  get roles(): Role[] {
    return [Role.STUDENT];
  }

  ngOnInit(): void {
    this.initReservations();
    this.initButtonsAvailability();
  }

  private initReservations(): void {
    this.addSubscription(
      this.getDataSource().subscribe(([theses, reservations, activeReservation]) => {
        this.theses = theses;
        this.reservations = reservations;
        this.activeReservation = activeReservation;
        this.markForCheck();
      })
    );
  }

  initButtonsAvailability(): void {
    this.addSubscription(
      this.contextSource.pipe(
        switchMap(context => this.deadlinesService
          .canStudentReserveThesisFromSameDiplomaSession(context.userRole.id, context.diplomaSession!))
      ).subscribe(canCreateNew => {
        this.canCreateNew = canCreateNew;
        this.markForCheck();
      })
    );
  }

  private getDataSource(): Observable<[Thesis[], Reservation[], Reservation | undefined]> {
    return this.contextSource.pipe(
      switchMap(context => combineLatest([
          this.thesesService.getApprovedTheses(context.diplomaSession!.id),
          this.thesesService.getStudentReservations(context.userRole.id, context.diplomaSession!.id),
          this.thesesService.getConfirmedStudentReservation(context.userRole.id, context.diplomaSession!.id)
        ]).pipe(map(([t, r, cr]) => ([t, r, cr] as [Thesis[], Reservation[], Reservation | undefined])))
      )
    );
  }

  public topicDetails(topic: Thesis): void {
    this.router.navigate(['/student/reservations/topic', topic.id]).then();
  }

  public reserveTopic(topic: Thesis): void {
    this.router.navigate(['/student/reservations/create', topic.id]).then();
  }

  public reservationDetails(reservation: Reservation): void {
    this.router.navigate(['/student/reservations/details', reservation.id]).then();
  }

}
