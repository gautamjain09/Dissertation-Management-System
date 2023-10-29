import { UserRole } from './user-role.model';
import { UserPerson } from './user-person.model';
import { autoserializeAs, inheritSerialization } from 'cerialize';

@inheritSerialization(UserPerson)
export class User extends UserPerson {

  @autoserializeAs(UserRole)
  roles!: UserRole[];
}
