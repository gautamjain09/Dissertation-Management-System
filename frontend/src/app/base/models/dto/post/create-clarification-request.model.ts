import { autoserialize, autoserializeAs } from 'cerialize';
import { IdType } from '../id.model';
import { IdTypeSerializer } from '../../../utils/serializers';

export class CreateClarificationRequest {

  @autoserializeAs(IdTypeSerializer)
  topicId!: IdType;

  @autoserializeAs(IdTypeSerializer)
  studentId!: IdType;

  @autoserialize
  newTopic!: string;

  @autoserialize
  newDescription!: string;
}
