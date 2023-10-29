import { autoserialize, autoserializeAs } from 'cerialize';
import { NotificationType } from './notification-type.model';

export class NotificationTemplate {

  @autoserializeAs(NotificationType)
  label!: NotificationType;

  @autoserialize
  content!: string;

}
