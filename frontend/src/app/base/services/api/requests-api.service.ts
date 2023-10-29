import { Injectable } from '@angular/core';
import { ServerHttpService } from '../../../core/services/server-http.service';
import { Observable } from 'rxjs';
import { ApiLabel } from '../../../core/models/api-route.model';
import { RequestParams } from '../../../core/models/request-param.model';
import { BaseApiService } from './base-api.service';
import { ClarificationRequest } from '../../models/dto/clarification-request.model';
import { ChangeRequest } from '../../models/dto/change-request.model';
import { IdType } from '../../models/dto/id.model';
import { Role } from '../../models/dto/role.model';
import {
  LoadChangeRequestsActionOptions,
  LoadClarificationRequestsActionOptions
} from '../../store/requests/requests.actions';
import { CreateClarificationRequest } from '../../models/dto/post/create-clarification-request.model';
import { CreateChangeRequest } from '../../models/dto/post/create-change-request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestsApiService extends BaseApiService {

  constructor(private readonly http: ServerHttpService) {
    super();
  }

  getClarificationRequests(options: LoadClarificationRequestsActionOptions): Observable<ClarificationRequest[]> {
    const queryParams = new RequestParams();
    queryParams.addIfValueExists('reviewedByEmployeeId', options.reviewedByEmployeeId);
    queryParams.addIfValueExists('diplomaSessionId', options.diplomaSessionId);
    queryParams.addIfValueExists('studentId', options.studentId);
    queryParams.addIfValueExists('status', options.status);
    return this.http.getApiWithLabelDeserialized(ClarificationRequest, ApiLabel.GET_CLARIFICATION_REQUESTS, undefined, queryParams);
  }

  getChangeRequests(options: LoadChangeRequestsActionOptions): Observable<ChangeRequest[]> {
    const queryParams = new RequestParams();
    queryParams.addIfValueExists('reviewedByEmployeeId', options.reviewedByEmployeeId);
    queryParams.addIfValueExists('diplomaSessionId', options.diplomaSessionId);
    queryParams.addIfValueExists('studentId', options.studentId);
    queryParams.addIfValueExists('status', options.status);
    return this.http.getApiWithLabelDeserialized(ChangeRequest, ApiLabel.GET_CHANGE_REQUESTS, undefined, queryParams);
  }

  getClarificationRequestForId(id: IdType): Observable<ClarificationRequest> {
    const query = new RequestParams();
    query.addIfValueExists('id', id);
    return this.http.getApiWithLabelDeserialized(ClarificationRequest, ApiLabel.GET_CLARIFICATION_REQUEST, undefined, query);
  }

  getChangeRequestForId(id: IdType): Observable<ChangeRequest> {
    const query = new RequestParams();
    query.addIfValueExists('id', id);
    return this.http.getApiWithLabelDeserialized(ChangeRequest, ApiLabel.GET_CHANGE_REQUEST, undefined, query);
  }

  rejectClarificationRequestWithDean(deanId: IdType, requestId: IdType): Observable<void> {
    const payload = { requestId, role: Role.DEAN, roleId: deanId };
    return this.http.postApiWithLabelSerializedDeserialized(ClarificationRequest, ApiLabel.REJECT_CLARIFICATION_REQUEST, payload);
  }

  approveClarificationRequestWithDean(deanId: IdType, requestId: IdType): Observable<void> {
    const payload = { requestId, role: Role.DEAN, roleId: deanId };
    return this.http.postApiWithLabelSerializedDeserialized(ClarificationRequest, ApiLabel.APPROVE_CLARIFICATION_REQUEST, payload);
  }

  createClarificationRequest(thesisId: IdType, payload: CreateClarificationRequest): Observable<void> {
    return this.http.postApiWithLabelSerializedDeserialized(ClarificationRequest, ApiLabel.CREATE_CLARIFICATION_REQUEST, payload);
  }

  rejectChangeRequestWithCommitteeMember(committeeMemberId: IdType, requestId: IdType): Observable<void> {
    const payload = { requestId, role: Role.PROGRAM_COMMITTEE_MEMBER, roleId: committeeMemberId };
    return this.http.postApiWithLabelSerializedDeserialized(ChangeRequest, ApiLabel.REJECT_CHANGE_REQUEST, payload);
  }

  approveChangeRequestWithCommitteeMember(committeeMemberId: IdType, requestId: IdType): Observable<void> {
    const payload = { requestId, role: Role.PROGRAM_COMMITTEE_MEMBER, roleId: committeeMemberId };
    return this.http.postApiWithLabelSerializedDeserialized(ChangeRequest, ApiLabel.APPROVE_CHANGE_REQUEST, payload);
  }

  createChangeRequest(thesisId: IdType, payload: CreateChangeRequest): Observable<ChangeRequest> {
    return this.http.postApiWithLabelSerializedDeserialized(ChangeRequest, ApiLabel.CREATE_CHANGE_REQUEST, payload);
  }

}
