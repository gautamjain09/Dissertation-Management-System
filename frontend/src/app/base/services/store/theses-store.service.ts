import { Injectable } from '@angular/core';
import { Selector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app-state.model';
import { CleanableStoreService } from '../../../core/services/cleanable-store.service';
import { selectRequestsStateError } from '../../store/requests/requests.selectors';
import { Reservation } from '../../models/dto/reservation.model';
import {
  invalidateThesesDataAction,
  loadReservationForIdAction,
  loadReservationForIdIfNeededAction,
  loadReservationsAction,
  LoadReservationsActionOptions,
  loadStudentReservationsIfNeededAction,
  loadThesesAction,
  LoadThesesActionOptions,
  loadThesesIfNeededAction,
  loadThesisForIdAction,
  loadThesisForIdIfNeededAction
} from '../../store/theses/theses.actions';
import {
  selectReservationForId,
  selectReservationsForKey,
  selectThesesForKey,
  selectThesesStateInProgress,
  selectThesisForId
} from '../../store/theses/theses.selectors';
import { ThesesStateKey } from '../../store/theses/theses.state';
import { Thesis } from '../../models/dto/thesis.model';
import { filterExists } from '../../../core/tools/filter-exists';
import { IdType } from '../../models/dto/id.model';

@Injectable({
  providedIn: 'root'
})
export class ThesesStoreService extends CleanableStoreService {

  constructor(store: Store<AppState>) {
    super(store);
  }

  public getTheses(options: LoadThesesActionOptions, ifNeededOnly = true): Observable<Thesis[]> {
    const key = options.toKey();
    this.loadTheses(options, key, ifNeededOnly);
    return this.selectThesesForKey(key).pipe(filterExists());
  }

  public getThesisForId(thesisId: IdType, ifNeededOnly = true): Observable<Thesis> {
    this.loadThesisForId(thesisId, ifNeededOnly);
    return this.selectThesisForId(thesisId).pipe(filterExists());
  }

  public getStudentReservations(options: LoadReservationsActionOptions, ifNeededOnly = true): Observable<Reservation[]> {
    const key = options.toKey();
    this.loadStudentReservations(options, key, ifNeededOnly);
    return this.selectReservationsForKey(key).pipe(filterExists());
  }

  public getReservationForId(reservationId: IdType, ifNeededOnly = true): Observable<Reservation> {
    this.loadReservationForId(reservationId, ifNeededOnly);
    return this.selectReservationForId(reservationId).pipe(filterExists());
  }

  public loadTheses(options: LoadThesesActionOptions, key: string, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadThesesIfNeededAction({ options, key })
      : loadThesesAction({ options, key });
    this.store.dispatch(action);
  }

  public loadThesisForId(id: IdType, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadThesisForIdIfNeededAction({ id })
      : loadThesisForIdAction({ id });
    this.store.dispatch(action);
  }

  public loadStudentReservations(options: LoadReservationsActionOptions, key: string, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadStudentReservationsIfNeededAction({ options, key })
      : loadReservationsAction({ options, key });
    this.store.dispatch(action);
  }

  public loadReservationForId(id: IdType, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadReservationForIdIfNeededAction({ id })
      : loadReservationForIdAction({ id });
    this.store.dispatch(action);
  }

  public invalidateTheses(): void {
    this.invalidateStoreForType(ThesesStateKey.THESES);
  }

  public invalidateReservations(): void {
    this.invalidateStoreForType(ThesesStateKey.RESERVATIONS);
  }

  public invalidateStoreForType(resourceType: ThesesStateKey): void {
    this.store.dispatch(invalidateThesesDataAction({ resourceType }));
  }

  public selectReservationsForKey(key: string): Observable<Reservation[] | undefined> {
    return this.store.select(selectReservationsForKey, key);
  }

  public selectReservationForId(id: IdType): Observable<Reservation | undefined> {
    return this.store.select(selectReservationForId, id);
  }

  public selectThesesForKey(key: string): Observable<Thesis[] | undefined> {
    return this.store.select(selectThesesForKey, key);
  }

  public selectThesisForId(id: IdType): Observable<Thesis | undefined> {
    return this.store.select(selectThesisForId, id);
  }

  public selectStateError(): Observable<any> {
    return this.store.select(selectRequestsStateError);
  }

  public getProgressSelector(): Selector<AppState, boolean> {
    return selectThesesStateInProgress;
  }

}
