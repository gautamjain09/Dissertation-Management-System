import { createAction, props } from '@ngrx/store';
import { RequestsStateKey, RequestType } from './requests.state';
import { IdType } from '../../models/dto/id.model';
import { RequestStatus } from '../../models/dto/request-status.model';

export const loadClarificationRequestsAction = createAction(
  '[REQUESTS] Load clarification requests',
  props<{ options: LoadClarificationRequestsActionOptions, key: string }>()
);
export const loadClarificationRequestsIfNeededAction = createAction(
  '[REQUESTS] Load clarification requests if needed',
  props<{ options: LoadClarificationRequestsActionOptions, key: string }>()
);
export const loadClarificationRequestForIdAction = createAction(
  '[REQUESTS] Load clarification request for id',
  props<{ id: IdType }>()
);
export const loadClarificationRequestForIdIfNeededAction = createAction(
  '[REQUESTS] Load clarification request for id if needed',
  props<{ id: IdType }>()
);

export const loadChangeRequestsAction = createAction(
  '[REQUESTS] Load change requests',
  props<{ options: LoadChangeRequestsActionOptions, key: string }>()
);
export const loadChangeRequestsIfNeededAction = createAction(
  '[REQUESTS] Load change requests if needed',
  props<{ options: LoadClarificationRequestsActionOptions, key: string }>()
);
export const loadChangeRequestForIdAction = createAction(
  '[REQUESTS] Load change request for id',
  props<{ id: IdType }>()
);
export const loadChangeRequestForIdIfNeededAction = createAction(
  '[REQUESTS] Load change request for id if needed',
  props<{ id: IdType }>()
);

export const invalidateRequestsDataAction = createAction(
  '[REQUESTS] Invalidate store resource',
  props<{ resourceType: RequestsStateKey }>()
);

export const loadRequestsSuccessAction = createAction(
  '[REQUESTS] Load collection successful',
  props<{ resourceType: RequestsStateKey, collection: RequestType[], key: string }>()
);
export const loadRequestSuccessAction = createAction(
  '[REQUESTS] Load instance successful',
  props<{ resourceType: RequestsStateKey, instance: RequestType }>()
);

export const loadRequestsFailedAction = createAction(
  '[REQUESTS] Load failed',
  props<{ error: any }>()
);

export class LoadClarificationRequestsActionOptions {
  reviewedByEmployeeId?: IdType;
  diplomaSessionId?: IdType;
  studentId?: IdType;
  status?: RequestStatus;

  static forStudent(diplomaSessionId: IdType, studentId: IdType): LoadClarificationRequestsActionOptions {
    const options = new LoadClarificationRequestsActionOptions();
    options.diplomaSessionId = diplomaSessionId;
    options.studentId = studentId;
    return options;
  }

  static forStatus(diplomaSessionId: IdType, status: RequestStatus): LoadChangeRequestsActionOptions {
    const options = new LoadChangeRequestsActionOptions();
    options.diplomaSessionId = diplomaSessionId;
    options.status = status;
    return options;
  }

  static forReviewer(diplomaSessionId: IdType, deanId: IdType): LoadChangeRequestsActionOptions {
    const options = new LoadChangeRequestsActionOptions();
    options.diplomaSessionId = diplomaSessionId;
    options.reviewedByEmployeeId = deanId;
    return options;
  }

  toKey(): string {
    return [
      'LoadClarificationRequestsActionOptions',
      'RBEI_' + this.reviewedByEmployeeId,
      'DSI_' + this.diplomaSessionId,
      'SI_' + this.studentId,
      'S' + this.status
    ].join('$');
  }
}

export class LoadChangeRequestsActionOptions {
  reviewedByEmployeeId?: IdType;
  diplomaSessionId?: IdType;
  studentId?: IdType;
  status?: RequestStatus;

  static forStudent(diplomaSessionId: IdType, studentId: IdType): LoadChangeRequestsActionOptions {
    const options = new LoadChangeRequestsActionOptions();
    options.diplomaSessionId = diplomaSessionId;
    options.studentId = studentId;
    return options;
  }

  static forStatus(diplomaSessionId: IdType, status: RequestStatus): LoadChangeRequestsActionOptions {
    const options = new LoadChangeRequestsActionOptions();
    options.diplomaSessionId = diplomaSessionId;
    options.status = status;
    return options;
  }

  static forReviewer(diplomaSessionId: IdType, committeeId: IdType): LoadChangeRequestsActionOptions {
    const options = new LoadChangeRequestsActionOptions();
    options.diplomaSessionId = diplomaSessionId;
    options.reviewedByEmployeeId = committeeId;
    return options;
  }

  toKey(): string {
    return [
      'LoadChangeRequestsActionOptions',
      'RBEI_' + this.reviewedByEmployeeId,
      'DSI_' + this.diplomaSessionId,
      'SI_' + this.studentId,
      'S_' + this.status
    ].join('$');
  }
}
