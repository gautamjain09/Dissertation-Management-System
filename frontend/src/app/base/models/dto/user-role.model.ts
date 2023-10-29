import { Role } from './role.model';
import { WithId } from './id.model';
import { autoserializeAs, inheritSerialization } from 'cerialize';

@inheritSerialization(WithId)
export class UserRole extends WithId {

  @autoserializeAs(Role)
  role!: Role;
}
