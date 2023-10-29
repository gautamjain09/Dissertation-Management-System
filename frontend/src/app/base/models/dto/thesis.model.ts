import { ThesisStatus } from './topic-status.model';
import { IdType, WithId } from './id.model';
import { Employee } from './employee.model';
import { autoserialize, autoserializeAs, inheritSerialization } from 'cerialize';
import { IdTypeSerializer } from '../../utils/serializers';

@inheritSerialization(WithId)
export class Thesis extends WithId {

  @autoserializeAs(IdTypeSerializer)
  supervisorId!: IdType;

  @autoserializeAs(IdTypeSerializer)
  diplomaSessionId!: IdType;

  @autoserializeAs(IdTypeSerializer)
  authorStudentId?: IdType;

  @autoserialize
  topic!: string;

  @autoserialize
  description!: string;

  @autoserialize
  numberOfStudents!: number;

  @autoserializeAs(ThesisStatus)
  status!: ThesisStatus;

  @autoserialize
  coordinatorComment?: string;

  @autoserializeAs(Date)
  submissionDate!: Date;

  @autoserialize
  reportedByStudent!: boolean;

  @autoserializeAs(Employee)
  supervisor!: Employee;
}
