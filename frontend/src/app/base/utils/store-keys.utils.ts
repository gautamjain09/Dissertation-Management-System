import { UserRole } from '../models/dto/user-role.model';

export class StoreKeys {

  public static forUserRole(userRole: UserRole): string {
    return userRole.role + '_' + userRole.id;
  }


}
