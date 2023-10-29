import { BaseStoreState, StoreResource } from '../../../core/store/base-store-state.model';
import { User } from '../../models/dto/user.model';
import { Student } from '../../models/dto/student.model';
import { Employee } from '../../models/dto/employee.model';

export type UserStoreType = Student | Employee;

export enum UserStateKey {
  STUDENT = 'STUDENT',
  EMPLOYEE = 'EMPLOYEE'
}

export class UserState extends BaseStoreState {
  currentUser?: User;
  [UserStateKey.STUDENT] = new StoreResource<Student>();
  [UserStateKey.EMPLOYEE] = new StoreResource<Employee>();
}
