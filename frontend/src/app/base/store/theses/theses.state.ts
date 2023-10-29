import { BaseStoreState, StoreResource } from '../../../core/store/base-store-state.model';
import { Reservation } from '../../models/dto/reservation.model';
import { Thesis } from '../../models/dto/thesis.model';

export type ThesesStoreType = Thesis | Reservation;

export enum ThesesStateKey {
  THESES = 'THESES',
  RESERVATIONS = 'RESERVATIONS'
}

export class ThesesState extends BaseStoreState {
  [ThesesStateKey.THESES] = new StoreResource<Thesis>();
  [ThesesStateKey.RESERVATIONS] = new StoreResource<Reservation>();
}
