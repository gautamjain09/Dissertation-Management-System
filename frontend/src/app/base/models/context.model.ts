import { UserRole } from './dto/user-role.model';
import { DiplomaSession } from './dto/diploma-session.model';
import { FieldOfStudy } from './dto/field-of-study.model';

export interface Context {
  userRole: UserRole;
  fieldOfStudy?: FieldOfStudy;
  diplomaSession?: DiplomaSession;
}
