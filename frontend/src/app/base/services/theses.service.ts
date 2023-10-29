import { Injectable } from '@angular/core';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { Reservation } from '../models/dto/reservation.model';
import { ThesesStoreService } from './store/theses-store.service';
import { Thesis } from '../models/dto/thesis.model';
import { map, tap } from 'rxjs/operators';
import { ReservationStatus } from '../models/dto/reservation-status.model';
import { firstItem } from '../../core/tools/first-item';
import { isEmpty, isNil } from 'lodash-es';
import { LoadReservationsActionOptions, LoadThesesActionOptions } from '../store/theses/theses.actions';
import { ThesesApiService } from './api/theses-api.service';
import { IdType } from '../models/dto/id.model';
import { ThesisStatus } from '../models/dto/topic-status.model';
import { ReservationMember } from '../models/dto/reservation-member.model';
import { CreateReservation } from '../models/dto/post/create-reservation.model';
import { CorrectThesis } from '../models/dto/post/correct-thesis.model';

@Injectable({
  providedIn: 'root'
})
export class ThesesService {

  public inactiveThesisStates: ThesisStatus[] = [
    ThesisStatus.REJECTED_BY_LECTURER,
    ThesisStatus.REJECTED_BY_COORDINATOR,
    ThesisStatus.REJECTED_BY_COMMITTEE
  ];

  constructor(private readonly thesesStoreService: ThesesStoreService,
              private readonly thesesApiService: ThesesApiService) {
  }

  public invalidateTheses(): void {
    this.thesesStoreService.invalidateTheses();
  }

  public invalidateReservations(): void {
    this.thesesStoreService.invalidateReservations();
  }

  public getThesisForLecturerAndDiplomaSession(lecturerId: IdType, diplomaSessionId: IdType): Observable<Thesis[]> {
    const options = LoadThesesActionOptions.forLecturer(diplomaSessionId, lecturerId);
    return this.thesesStoreService.getTheses(options);
  }

  public getThesisWithStatus(diplomaSessionId: IdType, status: ThesisStatus): Observable<Thesis[]> {
    const options = LoadThesesActionOptions.forStatus(diplomaSessionId, status);
    return this.thesesStoreService.getTheses(options);
  }

  public getApprovedTheses(diplomaSessionId: IdType): Observable<Thesis[]> {
    const options = LoadThesesActionOptions.forStatus(diplomaSessionId, ThesisStatus.APPROVED_BY_COMMITTEE);
    return this.thesesStoreService.getTheses(options);
  }

  public getProposedByStudentTheses(diplomaSessionId: IdType, studentId: IdType): Observable<Thesis[]> {
    const options = LoadThesesActionOptions.proposedByStudent(diplomaSessionId, studentId);
    return this.thesesStoreService.getTheses(options);
  }

  public getThesisForId(thesisId: IdType): Observable<Thesis> {
    return this.thesesStoreService.getThesisForId(thesisId);
  }

  public getStudentReservations(studentId: IdType, diplomaSessionId: IdType): Observable<Reservation[]> {
    const options = LoadReservationsActionOptions.forStudent(studentId, diplomaSessionId);
    return this.thesesStoreService.getStudentReservations(options);
  }

  public getSupervisorReservations(supervisorId: IdType, diplomaSessionId: IdType): Observable<Reservation[]> {
    const options = LoadReservationsActionOptions.forSupervisor(supervisorId, diplomaSessionId);
    return this.thesesStoreService.getStudentReservations(options);
  }

  public getReservationForId(reservationId: IdType): Observable<Reservation> {
    return this.thesesStoreService.getReservationForId(reservationId);
  }

  public getConfirmedStudentReservation(studentId: IdType, diplomaSessionId: IdType): Observable<Reservation | undefined> {
    return this.getConfirmedStudentReservations(studentId, diplomaSessionId)
      .pipe(map(i => firstItem(i)));
  }

  public hasConfirmedStudentReservation(studentId: IdType, diplomaSessionId: IdType): Observable<boolean> {
    return this.getConfirmedStudentReservations(studentId, diplomaSessionId).pipe(map(i => !isEmpty(i)));
  }

  public getConfirmedStudentReservations(studentId: IdType, diplomaSessionId: IdType): Observable<Reservation[]> {
    return this.getStudentReservations(studentId, diplomaSessionId).pipe(
      map(reservations => reservations.filter(r => r.status === ReservationStatus.CONFIRMED))
    );
  }

  public getThesisForStudentConfirmedReservation(studentId: IdType, diplomaSessionId: IdType): Observable<Thesis> {
    return this.getConfirmedStudentReservation(studentId, diplomaSessionId).pipe(
      switchMap(r => isNil(r) ? EMPTY : this.getThesisForId(r.thesisId))
    );
  }

  public createThesis(thesis: Partial<Thesis>): Observable<Thesis> {
    return this.thesesApiService.createThesis(thesis)
      .pipe(tap(() => this.invalidateTheses()));
  }

  // on SUGGESTED state
  public confirmParticipationInReservation(studentId: IdType, reservationId: IdType): Observable<ReservationMember> {
    return this.thesesApiService.confirmParticipationInReservation(studentId, reservationId)
      .pipe(tap(() => this.invalidateReservations()));
  }

  // on WILLING state
  public confirmMemberReservationInReservation(studentId: IdType, reservationId: IdType): Observable<ReservationMember> {
    return this.thesesApiService.confirmMemberReservation(studentId, reservationId)
      .pipe(tap(() => this.invalidateReservations()));
  }

  public abandonReservationAsMember(studentId: IdType, reservationId: IdType): Observable<ReservationMember> {
    return this.thesesApiService.abandonReservationAsMember(studentId, reservationId)
      .pipe(tap(() => this.invalidateReservations()));
  }

  public createReservation(studentId: IdType, payload: CreateReservation): Observable<Reservation> {
    return this.thesesApiService.createReservation(studentId, payload)
      .pipe(tap(() => this.invalidateReservations()));
  }

  public rejectReservation(reservationId: IdType): Observable<Reservation> {
    return this.thesesApiService.rejectReservation(reservationId)
      .pipe(tap(() => this.invalidateReservations()));
  }

  public acceptReservation(reservationId: IdType): Observable<Reservation> {
    return this.thesesApiService.acceptReservation(reservationId)
      .pipe(tap(() => this.invalidateReservations()));
  }

  public requestForThesisCorrectionsWithCoordinator(coordinatorId: IdType, payload: object): Observable<Thesis> {
    return this.thesesApiService.requestForThesisCorrectionsWithCoordinator(coordinatorId, payload)
      .pipe(tap(() => this.invalidateTheses()));
  }

  public rejectThesisWithCoordinator(coordinatorId: IdType, payload: object): Observable<Thesis> {
    return this.thesesApiService.rejectThesisWithCoordinator(coordinatorId, payload)
      .pipe(tap(() => this.invalidateTheses()));
  }

  public approveThesisWithCoordinator(coordinatorId: IdType, thesisId: IdType): Observable<Thesis> {
    return this.thesesApiService.approveThesisWithCoordinator(thesisId)
      .pipe(tap(() => this.invalidateTheses()));
  }

  public rejectThesisWithCommitteeMember(committeeMemberId: IdType, payload: object): Observable<Thesis> {
    return this.thesesApiService.rejectThesisWithCommitteeMember(committeeMemberId, payload)
      .pipe(tap(() => this.invalidateTheses()));
  }

  public approveThesisWithCommitteeMember(committeeMemberId: IdType, thesisId: IdType): Observable<Thesis> {
    return this.thesesApiService.approveThesisWithCommitteeMember(thesisId)
      .pipe(tap(() => this.invalidateTheses()));
  }

  public rejectThesisWithLecturer(thesisId: IdType): Observable<Thesis> {
    return this.thesesApiService.rejectThesisWithLecturer(thesisId)
      .pipe(tap(() => this.invalidateTheses()));
  }

  public correctThesisWithLecturer(payload: CorrectThesis): Observable<Thesis> {
    return this.thesesApiService.correctThesisWithLecturer(payload)
      .pipe(tap(() => this.invalidateTheses()));
  }

  public acceptThesisWithLecturer(thesisId: IdType): Observable<Thesis> {
    return this.thesesApiService.acceptThesisWithLecturer(thesisId)
      .pipe(tap(() => this.invalidateTheses()));
  }

  public deleteProposition(thesisId: IdType): Observable<Thesis> {
    return this.thesesApiService.deleteProposition(thesisId)
      .pipe(tap(() => this.invalidateTheses()));
  }

}
