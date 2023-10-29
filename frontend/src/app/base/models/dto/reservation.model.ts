import { ReservationStatus } from './reservation-status.model';
import { IdType, WithId } from './id.model';
import { Thesis } from './thesis.model';
import { ReservationMember } from './reservation-member.model';
import { autoserializeAs, inheritSerialization } from 'cerialize';
import { IdTypeSerializer } from '../../utils/serializers';

@inheritSerialization(WithId)
export class Reservation extends WithId {

  @autoserializeAs(IdTypeSerializer)
  thesisId!: IdType;

  @autoserializeAs(ReservationStatus)
  status!: ReservationStatus;

  @autoserializeAs(Date)
  creationDate!: Date;

  @autoserializeAs(Thesis)
  thesis!: Thesis;

  @autoserializeAs(ReservationMember)
  reservationMembers!: ReservationMember[];
}
