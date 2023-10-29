import { WithId } from './id.model';
import { autoserialize, inheritSerialization } from 'cerialize';

@inheritSerialization(WithId)
export class Department extends WithId {

  @autoserialize
  name!: string;

  @autoserialize
  number!: string;
}
