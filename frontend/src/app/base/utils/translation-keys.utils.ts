import { ReservationStatus } from '../models/dto/reservation-status.model';
import { Role } from '../models/dto/role.model';
import { RequestStatus } from '../models/dto/request-status.model';
import { ThesisStatus } from '../models/dto/topic-status.model';
import { ReservationMemberStatus } from '../models/dto/reservation-member-status.model';
import { NotificationType } from '../models/dto/notification-type.model';

export class TranslationKeys {

  public static forThesisStatus(status: ThesisStatus): string {
    return 'ThesisStatus.' + status;
  }

  public static forReservationStatus(status: ReservationStatus): string {
    return 'ReservationsStatus.' + status;
  }

  public static forReservationMemberStatus(status: ReservationMemberStatus): string {
    return 'ReservationMember.' + status;
  }

  public static forRequestStatus(status: RequestStatus): string {
    return 'RequestStatus.' + status;
  }

  public static forNotificationType(notificationType: NotificationType): string {
    return 'NotificationType.' + notificationType;
  }

  public static forRole(role: Role): string {
    return 'Role.' + role;
  }

}
