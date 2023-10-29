import { EmployeeRole } from './employee-role.model';

export enum StudentRole {
  STUDENT = 'STUDENT'
}

export type Role = StudentRole | EmployeeRole;

export const Role = {
  ...StudentRole,
  ...EmployeeRole
};
