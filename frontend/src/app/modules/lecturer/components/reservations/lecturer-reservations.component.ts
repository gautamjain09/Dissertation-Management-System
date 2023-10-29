import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from '../../../../base/models/dto/reservation.model';
import { PermissionsService } from '../../../../base/services/permissions.service';
import { ThesesService } from '../../../../base/services/theses.service';
import { UserService } from '../../../../base/services/user.service';
import { SessionService } from '../../../../base/services/session.service';
import { Role } from '../../../../base/models/dto/role.model';
import { Observable, switchMap } from 'rxjs';
import { RoleComponent } from '../../../../base/components/role-component.directive';
import { partition } from 'lodash-es';
import { ReservationStatus } from '../../../../base/models/dto/reservation-status.model';

@Component({
  selector: 'app-lecturer-reservations',
  templateUrl: './lecturer-reservations.component.html',
  styleUrls: ['./lecturer-reservations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LecturerReservationsComponent extends RoleComponent implements OnInit {
  reservationsToConsider?: Reservation[];
  reservationsConfirmed?: Reservation[];
  reservationsAccepted?: Reservation[];
  reservationsOther?: Reservation[];

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
    return [Role.LECTURER];
  }

  ngOnInit(): void {
    this.initReservations();
    this.initButtonsAvailability();
  }

  private initReservations(): void {
    this.addSubscription(
      this.getDataSource().subscribe((reservations) => {
        const parts1 = partition(reservations, t => t.status === ReservationStatus.SUBMITTED);
        const parts2 = partition(parts1[1], t => t.status === ReservationStatus.CONFIRMED);
        const parts3 = partition(parts2[1], t => t.status === ReservationStatus.ACCEPTED);
        this.reservationsToConsider = parts1[0];
        this.reservationsConfirmed = parts2[0];
        this.reservationsAccepted = parts3[0];
        this.reservationsOther = parts3[1];
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

  private getDataSource(): Observable<Reservation[]> {
    return this.contextSource.pipe(switchMap(context =>
      this.thesesService.getSupervisorReservations(context.userRole.id, context.diplomaSession!.id)
    ));
  }

  public manageTopicReservation(reservation: Reservation): void {
    this.router.navigate(['/lecturer/reservations', reservation.id]).then();
  }

}
