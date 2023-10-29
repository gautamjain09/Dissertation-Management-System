import { Thesis } from '../dto/thesis.model';
import { ClarificationRequest } from '../dto/clarification-request.model';

export interface ClarificationRequestExt extends ClarificationRequest {
  thesis: Thesis;
}
