import { BaseRequest } from './base-request.model';
import { IdType } from './id.model';
import { Thesis } from './thesis.model';
import { autoserialize, autoserializeAs, inheritSerialization } from 'cerialize';
import { IdTypeSerializer } from '../../utils/serializers';

@inheritSerialization(BaseRequest)
export class ClarificationRequest extends BaseRequest {

  @autoserializeAs(IdTypeSerializer)
  thesisId!: IdType;

  @autoserialize
  newTopic!: string;

  @autoserialize
  newDescription!: string;

  @autoserializeAs(Thesis)
  baseThesis!: Thesis;
}
