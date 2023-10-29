import { BaseStoreState, StoreResource } from '../../../core/store/base-store-state.model';
import { ClarificationRequest } from '../../models/dto/clarification-request.model';
import { ChangeRequest } from '../../models/dto/change-request.model';

export type RequestType = ClarificationRequest | ChangeRequest;

export enum RequestsStateKey {
  CLARIFICATION = 'CLARIFICATION',
  CHANGE = 'CHANGE',
}

export class RequestsState extends BaseStoreState {
  [RequestsStateKey.CLARIFICATION] = new StoreResource<ClarificationRequest>();
  [RequestsStateKey.CHANGE] = new StoreResource<ChangeRequest>();
}
