import { Injectable } from '@angular/core';
import { ServerHttpService } from '../../../core/services/server-http.service';
import { Observable } from 'rxjs';
import { ApiLabel } from '../../../core/models/api-route.model';
import { Reservation } from '../../models/dto/reservation.model';
import { ReservationMember } from '../../models/dto/reservation-member.model';
import { RequestParams } from '../../../core/models/request-param.model';
import { Thesis } from '../../models/dto/thesis.model';
import { LoadReservationsActionOptions, LoadThesesActionOptions } from '../../store/theses/theses.actions';
import { IdType } from '../../models/dto/id.model';
import { CorrectThesis } from '../../models/dto/post/correct-thesis.model';
import { CreateReservation } from '../../models/dto/post/create-reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ThesesApiService {

  constructor(private readonly http: ServerHttpService) {
  }

  public getThesesForUserRole(options: LoadThesesActionOptions): Observable<Thesis[]> {
    const queryParams = new RequestParams();
    queryParams.addIfValueExists('status', options.status);
    queryParams.addIfValueExists('supervisorId', options.supervisorId);
    queryParams.addIfValueExists('diplomaSessionId', options.diplomaSessionId);
    queryParams.addIfValueExists('proposedByStudentId', options.proposedByStudentId);
    return this.http.getApiWithLabelDeserialized(Thesis, ApiLabel.GET_THESES, undefined, queryParams);
  }

  public getThesisForId(id: IdType): Observable<Thesis> {
    const queryParams = new RequestParams();
    queryParams.addIfValueExists('id', id);
    return this.http.getApiWithLabelDeserialized(Thesis, ApiLabel.GET_THESIS, undefined, queryParams);
  }

  public getStudentReservations(options: LoadReservationsActionOptions): Observable<Reservation[]> {
    const query = new RequestParams();
    query.addIfValueExists('studentId', options.studentId);
    query.addIfValueExists('supervisorId', options.supervisorId);
    query.addIfValueExists('diplomaSessionId', options.diplomaSessionId);
    return this.http.getApiWithLabelDeserialized(Reservation, ApiLabel.GET_RESERVATIONS, undefined, query);
  }

  public getReservationForId(reservationId: IdType): Observable<Reservation> {
    const query = new RequestParams();
    query.addIfValueExists('id', reservationId);
    return this.http.getApiWithLabelDeserialized(Reservation, ApiLabel.GET_RESERVATION, undefined, query);
  }

  public createThesis(thesis: Partial<Thesis>): Observable<Thesis> {
    return this.http.postApiWithLabelSerializedDeserialized(Thesis, ApiLabel.CREATE_THESIS, thesis);
  }

  public confirmParticipationInReservation(studentId: IdType, reservationId: IdType): Observable<ReservationMember> {
    const query = new RequestParams();
    query.addIfValueExists('studentId', studentId);
    query.addIfValueExists('reservationId', reservationId);
    return this.http.postApiWithLabelSerializedDeserialized(ReservationMember, ApiLabel.CONFIRM_PARTICIPATION_IN_RESERVATION, undefined, undefined, query);
  }

  public confirmMemberReservation(studentId: IdType, reservationId: IdType): Observable<ReservationMember> {
    const query = new RequestParams();
    query.addIfValueExists('studentId', studentId);
    query.addIfValueExists('reservationId', reservationId);
    return this.http.postApiWithLabelSerializedDeserialized(ReservationMember, ApiLabel.CONFIRM_MEMBER_RESERVATION, undefined, undefined, query);
  }

  public abandonReservationAsMember(studentId: IdType, reservationId: IdType): Observable<ReservationMember> {
    const query = new RequestParams();
    query.addIfValueExists('studentId', studentId);
    query.addIfValueExists('reservationId', reservationId);
    return this.http.postApiWithLabelSerializedDeserialized(ReservationMember, ApiLabel.ABANDON_MEMBER_RESERVATION, undefined, undefined, query);
  }

  public createReservation(studentId: IdType, payload: CreateReservation): Observable<Reservation> {
    const query = new RequestParams();
    query.addIfValueExists('studentId', studentId);
    return this.http.postApiWithLabelSerializedDeserialized(Reservation, ApiLabel.CREATE_RESERVATION, payload, undefined, query);
  }

  public rejectReservation(reservationId: IdType): Observable<Reservation> {
    const query = new RequestParams();
    query.addIfValueExists('id', reservationId);
    return this.http.postApiWithLabelSerializedDeserialized(Reservation, ApiLabel.REJECT_RESERVATION, undefined, undefined, query);
  }

  public acceptReservation(reservationId: IdType): Observable<Reservation> {
    const query = new RequestParams();
    query.addIfValueExists('id', reservationId);
    return this.http.postApiWithLabelSerializedDeserialized(Reservation, ApiLabel.ACCEPT_RESERVATION, undefined, undefined, query);
  }

  public requestForThesisCorrectionsWithCoordinator(coordinatorId: IdType, payload: object): Observable<Thesis> {
    return this.http.postApiWithLabelSerializedDeserialized(Thesis, ApiLabel.REQUEST_THESIS_CORRECTIONS, payload);
  }

  public rejectThesisWithCoordinator(coordinatorId: IdType, payload: object): Observable<Thesis> {
    return this.http.postApiWithLabelSerializedDeserialized(Thesis, ApiLabel.REJECT_THESIS_WITH_COORDINATOR, payload);
  }

  public approveThesisWithCoordinator(thesisId: IdType): Observable<Thesis> {
    const query = new RequestParams();
    query.addIfValueExists('id', thesisId);
    return this.http.postApiWithLabelSerializedDeserialized(Thesis, ApiLabel.APPROVE_THESIS_WITH_COORDINATOR, undefined, undefined, query);
  }

  public rejectThesisWithCommitteeMember(coordinatorId: IdType, payload: object): Observable<Thesis> {
    return this.http.postApiWithLabelSerializedDeserialized(Thesis, ApiLabel.REJECT_THESIS_WITH_COMMITTEE_MEMBER, payload);
  }

  public approveThesisWithCommitteeMember(thesisId: IdType): Observable<Thesis> {
    const query = new RequestParams();
    query.addIfValueExists('id', thesisId);
    return this.http.postApiWithLabelSerializedDeserialized(Thesis, ApiLabel.APPROVE_THESIS_WITH_COMMITTEE_MEMBER, undefined, undefined, query);
  }

  public rejectThesisWithLecturer(thesisId: IdType): Observable<Thesis> {
    const query = new RequestParams();
    query.addIfValueExists('id', thesisId);
    return this.http.postApiWithLabelSerializedDeserialized(Thesis, ApiLabel.REJECT_THESIS_WITH_LECTURER, undefined, undefined, query);
  }

  public correctThesisWithLecturer(payload: CorrectThesis): Observable<Thesis> {
    return this.http.postApiWithLabelSerializedDeserialized(Thesis, ApiLabel.CORRECT_THESIS_WITH_LECTURER, payload);
  }

  public acceptThesisWithLecturer(thesisId: IdType): Observable<Thesis> {
    const query = new RequestParams();
    query.addIfValueExists('id', thesisId);
    return this.http.postApiWithLabelSerializedDeserialized(Thesis, ApiLabel.ACCEPT_THESIS_WITH_LECTURER, undefined, undefined, query);
  };

  public deleteProposition(thesisId: IdType): Observable<Thesis> {
    const query = new RequestParams();
    query.addIfValueExists('id', thesisId);
    return this.http.postApiWithLabelSerializedDeserialized(Thesis, ApiLabel.DELETE_THESIS_WITH_STUDENT, undefined, undefined, query);
  };

}
