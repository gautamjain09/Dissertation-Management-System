import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestsStateKey } from '../store/requests/requests.state';
import { RequestsStoreService } from './store/requests-store.service';
import { RequestsApiService } from './api/requests-api.service';
import { ClarificationRequest } from '../models/dto/clarification-request.model';
import { ChangeRequest } from '../models/dto/change-request.model';
import { IdType } from '../models/dto/id.model';
import {
  LoadChangeRequestsActionOptions,
  LoadClarificationRequestsActionOptions
} from '../store/requests/requests.actions';
import { RequestStatus } from '../models/dto/request-status.model';
import { CreateClarificationRequest } from '../models/dto/post/create-clarification-request.model';
import { CreateChangeRequest } from '../models/dto/post/create-change-request.model';
import { ThesesStoreService } from './store/theses-store.service';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  constructor(private readonly requestsApiService: RequestsApiService,
              private readonly requestsStoreService: RequestsStoreService,
              private readonly thesesStoreService: ThesesStoreService) {
  }

  public getChangeRequestsForStudent(diplomaSessionId: IdType, studentId: IdType, ifNeededOnly = true): Observable<ChangeRequest[]> {
    const options = LoadChangeRequestsActionOptions.forStudent(diplomaSessionId, studentId);
    return this.requestsStoreService.getChangeRequests(options, ifNeededOnly);
  }

  public getChangeRequestsToReview(diplomaSessionId: IdType, ifNeededOnly = true): Observable<ChangeRequest[]> {
    const options = LoadChangeRequestsActionOptions.forStatus(diplomaSessionId, RequestStatus.WAITING);
    return this.requestsStoreService.getChangeRequests(options, ifNeededOnly);
  }

  public getReviewedChangeRequests(diplomaSessionId: IdType, reviewerCommitteeId: IdType, ifNeededOnly = true): Observable<ChangeRequest[]> {
    const options = LoadChangeRequestsActionOptions.forReviewer(diplomaSessionId, reviewerCommitteeId);
    return this.requestsStoreService.getChangeRequests(options, ifNeededOnly);
  }

  public getChangeRequestForId(requestId: IdType, ifNeededOnly = true): Observable<ChangeRequest> {
    return this.requestsStoreService.getChangeRequestForId(requestId, ifNeededOnly);
  }

  public getClarificationRequestsForStudent(diplomaSessionId: IdType, studentId: IdType, ifNeededOnly = true): Observable<ClarificationRequest[]> {
    const options = LoadClarificationRequestsActionOptions.forStudent(diplomaSessionId, studentId);
    return this.requestsStoreService.getClarificationRequests(options, ifNeededOnly);
  }

  public getClarificationRequestsToReview(diplomaSessionId: IdType, ifNeededOnly = true): Observable<ClarificationRequest[]> {
    const options = LoadClarificationRequestsActionOptions.forStatus(diplomaSessionId, RequestStatus.WAITING);
    return this.requestsStoreService.getClarificationRequests(options, ifNeededOnly);
  }

  public getReviewedClarificationRequests(diplomaSessionId: IdType, reviewerDeanId: IdType, ifNeededOnly = true): Observable<ClarificationRequest[]> {
    const options = LoadClarificationRequestsActionOptions.forReviewer(diplomaSessionId, reviewerDeanId);
    return this.requestsStoreService.getClarificationRequests(options, ifNeededOnly);
  }

  public getClarificationRequestForId(requestId: IdType, ifNeededOnly = true): Observable<ClarificationRequest> {
    return this.requestsStoreService.getClarificationRequestForId(requestId, ifNeededOnly);
  }

  public invalidateClarificationRequests(): void {
    this.requestsStoreService.invalidateStoreForType(RequestsStateKey.CLARIFICATION);
  }

  public invalidateChangeRequests(): void {
    this.requestsStoreService.invalidateStoreForType(RequestsStateKey.CHANGE);
  }

  public rejectClarificationRequestWithDean(deanId: IdType, requestId: IdType): Observable<void> {
    return this.requestsApiService.rejectClarificationRequestWithDean(deanId, requestId)
      .pipe(tap(() => this.invalidateClarificationRequests()));
  }

  public approveClarificationRequestWithDean(deanId: IdType, requestId: IdType): Observable<void> {
    return this.requestsApiService.approveClarificationRequestWithDean(deanId, requestId)
      .pipe(tap(() => this.invalidateClarificationRequests()));
  }

  public createClarificationRequest(thesisId: IdType, request: CreateClarificationRequest): Observable<void> {
    return this.requestsApiService.createClarificationRequest(thesisId, request)
      .pipe(tap(() => this.invalidateClarificationRequests()));
  }

  public rejectChangeRequestWithCommitteeMember(committeeMemberId: IdType, requestId: IdType): Observable<void> {
    return this.requestsApiService.rejectChangeRequestWithCommitteeMember(committeeMemberId, requestId)
      .pipe(tap(() => this.invalidateChangeRequests()));
  }

  public approveChangeRequestWithCommitteeMember(committeeMemberId: IdType, requestId: IdType): Observable<void> {
    return this.requestsApiService.approveChangeRequestWithCommitteeMember(committeeMemberId, requestId)
      .pipe(tap(() => {
        this.invalidateChangeRequests();
        this.thesesStoreService.invalidateReservations();
      }));
  }

  public createChangeRequest(thesisId: IdType, request: CreateChangeRequest): Observable<ChangeRequest> {
    return this.requestsApiService.createChangeRequest(thesisId, request)
      .pipe(tap(() => this.invalidateChangeRequests()));
  }

}
