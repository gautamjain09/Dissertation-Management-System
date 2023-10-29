import { IdType, WithId } from './id.model';
import { ReservationMemberStatus } from './reservation-member-status.model';
import { Student } from './student.model';
import { autoserializeAs, inheritSerialization } from 'cerialize';
import { IdTypeSerializer } from '../../utils/serializers';

@inheritSerialization(WithId)
export class ReservationMember extends WithId {

  @autoserializeAs(IdTypeSerializer)
  studentId!: IdType;

  @autoserializeAs(IdTypeSerializer)
  reservationId!: IdType;

  @autoserializeAs(ReservationMemberStatus)
  status!: ReservationMemberStatus;

  @autoserializeAs(Student)
  student!: Student;
}
