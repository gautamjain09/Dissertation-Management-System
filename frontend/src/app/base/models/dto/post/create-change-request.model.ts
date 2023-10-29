import { IdType } from '../id.model';
import { autoserialize, autoserializeAs } from 'cerialize';
import { IdTypeSerializer } from '../../../utils/serializers';

export class CreateChangeRequestNewThesis {

  @autoserialize
  topic!: string;

  @autoserialize
  description!: string;

  @autoserializeAs(IdTypeSerializer)
  supervisorId!: IdType;
}

export class CreateChangeRequest {

  @autoserializeAs(IdTypeSerializer)
  studentId!: IdType;

  @autoserializeAs(IdTypeSerializer)
  previousThesisId!: IdType;

  @autoserializeAs(IdTypeSerializer)
  newThesisId?: IdType;

  @autoserializeAs(CreateChangeRequestNewThesis)
  newThesis?: CreateChangeRequestNewThesis;

}
