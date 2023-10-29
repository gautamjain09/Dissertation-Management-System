import { autoserializeAs } from 'cerialize';
import { IdTypeSerializer } from '../../utils/serializers';

export type IdType = string;


export class WithId {

  @autoserializeAs(IdTypeSerializer)
  id!: IdType;
}
