export enum ReservationMemberStatus {
  SUGGESTED = 'SUGGESTED',
  WILLING = 'WILLING',
  CONFIRMED = 'CONFIRMED',
  REJECTED = 'REJECTED',
}

export const finalMemberStatuses: ReservationMemberStatus[] = [
  ReservationMemberStatus.REJECTED,
  ReservationMemberStatus.CONFIRMED
];
