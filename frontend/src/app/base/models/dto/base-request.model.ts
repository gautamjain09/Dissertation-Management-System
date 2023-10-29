import { RequestStatus } from './request-status.model';
import { IdType, WithId } from './id.model';
import { Student } from './student.model';
import { autoserializeAs, inheritSerialization } from 'cerialize';
import { IdTypeSerializer } from '../../utils/serializers';

@inheritSerialization(WithId)
export class BaseRequest extends WithId {

  @autoserializeAs(Date)
  submissionDate!: Date;

  @autoserializeAs(RequestStatus)
  status!: RequestStatus;

  @autoserializeAs(IdTypeSerializer)
  studentId!: IdType;

  @autoserializeAs(IdTypeSerializer)
  employeeId?: IdType;

  @autoserializeAs(Student)
  student!: Student;
}
