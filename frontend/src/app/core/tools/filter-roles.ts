import { filter, OperatorFunction } from 'rxjs';
import { UserRole } from '../../base/models/dto/user-role.model';
import { Role } from '../../base/models/dto/role.model';
import { map } from 'rxjs/operators';
import { filterExists } from './filter-exists';
import { isNotNil } from './is-not-nil';

export function filterRoles<T extends UserRole | undefined>(roles: Role[]): OperatorFunction<T, NonNullable<T>> {
  return (source) => source.pipe(
    filterExists(),
    filter((v) => roles.includes(v.role)),
    map(v => v!));
}

export function filterRolesWitSelector<T>(roles: Role[], selector: (a: T) => UserRole | undefined): OperatorFunction<T, NonNullable<T>> {
  return (source) => source.pipe(
    filterExists(),
    filter(value => {
      const userRole = selector(value);
      return isNotNil(userRole) && roles.includes(userRole!.role);
    })
  );
}
