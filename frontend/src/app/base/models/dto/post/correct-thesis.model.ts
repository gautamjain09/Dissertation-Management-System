import { IdType } from '../id.model';
import { autoserialize, autoserializeAs } from 'cerialize';
import { IdTypeSerializer } from '../../../utils/serializers';

export class CorrectThesisChanges {

  @autoserialize
  topic!: string;

  @autoserialize
  description!: string;

  @autoserialize
  numberOfStudents!: number;

}

export class CorrectThesis {

  @autoserializeAs(IdTypeSerializer)
  thesisId!: IdType;

  @autoserializeAs(CorrectThesisChanges)
  changes!: CorrectThesisChanges;
}
