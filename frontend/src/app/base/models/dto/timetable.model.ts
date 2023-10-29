import { IdType, WithId } from './id.model';
import { autoserializeAs, inheritSerialization } from 'cerialize';
import { DateSerializer, IdTypeSerializer } from '../../utils/serializers';

@inheritSerialization(WithId)
export class Timetable extends WithId {

  @autoserializeAs(IdTypeSerializer)
  diplomaSessionId!: IdType;

  @autoserializeAs(DateSerializer)
  submittingThesis!: Date;

  @autoserializeAs(DateSerializer)
  approvingThesisByCoordinator!: Date;

  @autoserializeAs(DateSerializer)
  approvingThesisByCommittee!: Date;

  @autoserializeAs(DateSerializer)
  selectingThesis!: Date;

  @autoserializeAs(DateSerializer)
  clarificationThesis!: Date;

  @autoserializeAs(DateSerializer)
  changingThesis!: Date;
}
