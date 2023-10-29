import { StudyDegree } from './study-degree.model';
import { IdType, WithId } from './id.model';
import { autoserialize, autoserializeAs, inheritSerialization } from 'cerialize';
import { IdTypeSerializer } from '../../utils/serializers';

@inheritSerialization(WithId)
export class FieldOfStudy extends WithId {

  @autoserializeAs(IdTypeSerializer)
  departmentId!: IdType;

  @autoserialize
  name!: string;

  @autoserializeAs(StudyDegree)
  degree!: StudyDegree;
}
