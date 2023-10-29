import { Injectable } from '@angular/core';
import { Serializable, ServerHttpService } from '../../../core/services/server-http.service';
import { Observable } from 'rxjs';
import { ApiLabel } from '../../../core/models/api-route.model';
import { RequestParams } from '../../../core/models/request-param.model';
import { BaseApiService } from './base-api.service';
import { IdType } from '../../models/dto/id.model';
import {
  LoadDepartmentsActionOptions,
  LoadDiplomaSessionsActionOptions,
  LoadFieldsOfStudyActionOptions,
  LoadTimetablesActionOptions
} from '../../store/general/general.actions';
import { Timetable } from '../../models/dto/timetable.model';
import { DiplomaSession } from '../../models/dto/diploma-session.model';
import { Department } from '../../models/dto/department.model';
import { FieldOfStudy } from '../../models/dto/field-of-study.model';
import { NotificationTemplate } from '../../models/dto/notification.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralResourcesApiService extends BaseApiService {

  constructor(private readonly http: ServerHttpService) {
    super();
  }

  public getTimetables(options: LoadTimetablesActionOptions): Observable<Timetable[]> {
    return this.http.getApiWithLabelDeserialized<Timetable, Timetable[]>(Timetable, ApiLabel.GET_TIMETABLES);
  }

  public getDiplomaSessions(options: LoadDiplomaSessionsActionOptions): Observable<DiplomaSession[]> {
    const queryParams = new RequestParams();
    queryParams.addIfValueExists('fieldOfStudyId', options.fieldOfStudyId);
    queryParams.addIfValueExists('departmentId', options.departmentId);
    return this.http.getApiWithLabelDeserialized(DiplomaSession, ApiLabel.GET_DIPLOMA_SESSIONS, undefined, queryParams);
  }

  public getDepartments(options: LoadDepartmentsActionOptions): Observable<Department[]> {
    return this.http.getApiWithLabelDeserialized(Department, ApiLabel.GET_DEPARTMENTS);
  }

  public getFieldsOfStudy(options: LoadFieldsOfStudyActionOptions): Observable<FieldOfStudy[]> {
    const query = new RequestParams();
    query.addIfValueExists('departmentId', options.departmentId);
    return this.http.getApiWithLabelDeserialized(FieldOfStudy, ApiLabel.GET_FIELDS_OF_STUDY, undefined, query);
  }

  public getTimetableForId(id: IdType): Observable<Timetable> {
    return this.getResourceForId(Timetable, ApiLabel.GET_TIMETABLE, id);
  }

  public getDiplomaSessionForId(id: IdType): Observable<DiplomaSession> {
    return this.getResourceForId(DiplomaSession, ApiLabel.GET_DIPLOMA_SESSION, id);
  }

  public getDepartmentForId(id: IdType): Observable<Department> {
    return this.getResourceForId(Department, ApiLabel.GET_DEPARTMENT, id);
  }

  public getFieldOfStudyForId(id: IdType): Observable<FieldOfStudy> {
    return this.getResourceForId(FieldOfStudy, ApiLabel.GET_FIELD_OF_STUDY, id);
  }

  getResourceForId<T>(type: Serializable<T>, apiLabel: ApiLabel, id: IdType): Observable<T> {
    const query = new RequestParams();
    query.addIfValueExists('id', id);
    return this.http.getApiWithLabelDeserialized<T, T>(type, apiLabel, undefined, query);
  }

  getNotifications(): Observable<NotificationTemplate[]> {
    return this.http.getApiWithLabelDeserialized(NotificationTemplate, ApiLabel.GET_NOTIFICATIONS);
  }

  modifyNotification(payload: NotificationTemplate): Observable<NotificationTemplate> {
    return this.http.postApiWithLabelSerializedDeserialized(NotificationTemplate, ApiLabel.MODIFY_NOTIFICATION, payload);
  }

  modifyTimetable(timetableId: IdType, payload: Timetable): Observable<Timetable> {
    const query = new RequestParams();
    query.addIfValueExists('id', timetableId);
    return this.http.postApiWithLabelSerializedDeserialized(Timetable, ApiLabel.MODIFY_TIMETABLE, payload, undefined, query);
  }

}
