import { Injectable } from '@angular/core';
import { ServerHttpService } from '../../../core/services/server-http.service';
import { Observable } from 'rxjs';
import { ApiLabel } from '../../../core/models/api-route.model';
import { User } from '../../models/dto/user.model';
import { LoadEmployeesActionOptions, LoadStudentsActionOptions } from '../../store/user/user.actions';
import { Student } from '../../models/dto/student.model';
import { Employee } from '../../models/dto/employee.model';
import { IdType } from '../../models/dto/id.model';
import { RequestParams } from '../../../core/models/request-param.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private readonly http: ServerHttpService) {
  }

  getCurrentUser(): Observable<User> {
    return this.http.getApiWithLabelDeserialized(User, ApiLabel.GET_USER);
  }

  getStudents(options: LoadStudentsActionOptions): Observable<Student[]> {
    const query = new RequestParams();
    query.addIfValueExists('diplomaSessionId', options.diplomaSessionId);
    return this.http.getApiWithLabelDeserialized(Student, ApiLabel.GET_STUDENTS, undefined, query);
  }

  getStudentForId(id: IdType): Observable<Student> {
    const query = new RequestParams();
    query.addIfValueExists('id', id);
    return this.http.getApiWithLabelDeserialized(Student, ApiLabel.GET_STUDENT, undefined, query);
  }

  getEmployees(options: LoadEmployeesActionOptions): Observable<Employee[]> {
    const query = new RequestParams();
    query.addIfValueExists('role', options.role);
    query.addIfValueExists('diplomaSessionId', options.diplomaSessionId);
    return this.http.getApiWithLabelDeserialized(Employee, ApiLabel.GET_EMPLOYEES, undefined, query);
  }

  getEmployeeForId(id: IdType): Observable<Employee> {
    const query = new RequestParams();
    query.addIfValueExists('id', id);
    return this.http.getApiWithLabelDeserialized(Employee, ApiLabel.GET_EMPLOYEE, undefined, query);
  }


}
