import { autoserializeAs } from 'cerialize';
import { IdType } from '../id.model';
import { IdTypeSerializer } from '../../../utils/serializers';

export class CreateReservation {

  @autoserializeAs(IdTypeSerializer)
  thesisId!: IdType;

  @autoserializeAs(IdTypeSerializer)
  studentIds!: IdType[];
}
