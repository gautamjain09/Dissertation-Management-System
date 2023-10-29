import { IdType, WithId } from './id.model';
import { FieldOfStudy } from './field-of-study.model';
import { Timetable } from './timetable.model';
import { autoserialize, autoserializeAs, inheritSerialization } from 'cerialize';
import { IdTypeSerializer } from '../../utils/serializers';

@inheritSerialization(WithId)
export class DiplomaSession extends WithId {

  @autoserializeAs(IdTypeSerializer)
  timetableId!: IdType;

  @autoserialize
  year!: string;

  @autoserializeAs(FieldOfStudy)
  fieldOfStudy!: FieldOfStudy;

  @autoserializeAs(Timetable)
  timetable!: Timetable;
}
