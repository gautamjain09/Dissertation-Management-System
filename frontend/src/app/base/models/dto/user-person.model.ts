import { WithId } from './id.model';
import { autoserialize, inheritSerialization } from 'cerialize';

@inheritSerialization(WithId)
export class UserPerson extends WithId {

  @autoserialize
  firstName!: string;

  @autoserialize
  lastName!: string;
}
