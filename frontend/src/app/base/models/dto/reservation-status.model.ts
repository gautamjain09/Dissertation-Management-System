export enum ReservationStatus {
  WAITING = 'WAITING',
  SUBMITTED = 'SUBMITTED',
  ACCEPTED = 'ACCEPTED',
  REJECTED_BY_STUDENT = 'REJECTED_BY_STUDENT',
  REJECTED_BY_LECTURER = 'REJECTED_BY_LECTURER',
  CONFIRMED = 'CONFIRMED',
}

export const finalReservationStates: ReservationStatus[] = [
  ReservationStatus.CONFIRMED,
  ReservationStatus.REJECTED_BY_LECTURER,
  ReservationStatus.REJECTED_BY_STUDENT
];
