import { DiplomaSession } from '../models/dto/diploma-session.model';
import { Employee } from '../models/dto/employee.model';
import { isNotNil } from '../../core/tools/is-not-nil';
import { Student } from '../models/dto/student.model';
import { FieldOfStudy } from '../models/dto/field-of-study.model';

export class LabelBuilder {

  public static forDiplomaSession(session: DiplomaSession): string {
    return [session.fieldOfStudy.name, session.year].join(', ');
  }

  public static forFieldOfStudy(fieldOfStudy: FieldOfStudy): string {
    return fieldOfStudy.name;
  }

  public static forEmployee(employee: Employee): string {
    return [employee.title, employee.user.firstName, employee.user.lastName].filter(i => isNotNil(i)).join(' ');
  }

  public static forStudent(student: Student): string {
    return student.user.firstName + ' ' + student.user.lastName + ', ' + student.indexNumber;
  }

}
