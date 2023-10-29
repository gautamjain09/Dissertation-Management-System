import { IdType, WithId } from './id.model';
import { EmployeeRole } from './employee-role.model';
import { UserPerson } from './user-person.model';
import { autoserialize, autoserializeAs, inheritSerialization } from 'cerialize';
import { IdTypeSerializer } from '../../utils/serializers';

@inheritSerialization(WithId)
export class Employee extends WithId {

  @autoserializeAs(IdTypeSerializer)
  userId!: IdType;

  @autoserializeAs(IdTypeSerializer)
  departmentId!: IdType;

  @autoserializeAs(EmployeeRole)
  employeeRole!: EmployeeRole;

  @autoserialize
  title!: string;

  @autoserializeAs(UserPerson)
  user!: UserPerson;
}
