import { Injectable } from '@angular/core';
import { GeneralResourcesStateKey } from '../store/general/general.state';
import { GeneralResourcesStoreService } from './store/general-store.service';
import { IdType } from '../models/dto/id.model';
import { Observable } from 'rxjs';
import { DiplomaSession } from '../models/dto/diploma-session.model';
import { Timetable } from '../models/dto/timetable.model';
import { FieldOfStudy } from '../models/dto/field-of-study.model';
import { LoadDiplomaSessionsActionOptions, LoadFieldsOfStudyActionOptions } from '../store/general/general.actions';
import { GeneralResourcesApiService } from './api/general-api.service';
import { tap } from 'rxjs/operators';
import { NotificationTemplate } from '../models/dto/notification.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralResourcesService {

  private publicKey = 'PUBLIC';


  constructor(private readonly generalResourcesStoreService: GeneralResourcesStoreService,
              private readonly generalResourcesApiService: GeneralResourcesApiService) {
  }

  public invalidateAllGeneralResources(): void {
    this.generalResourcesStoreService.invalidateStoreForKey(GeneralResourcesStateKey.FIELDS_OF_STUDY);
    this.generalResourcesStoreService.invalidateStoreForKey(GeneralResourcesStateKey.DEPARTMENTS);
    this.generalResourcesStoreService.invalidateStoreForKey(GeneralResourcesStateKey.DIPLOMA_SESSIONS);
    this.generalResourcesStoreService.invalidateStoreForKey(GeneralResourcesStateKey.TIMETABLES);
  }

  public getFieldsOfStudyForDepartmentId(departmentId: IdType, ifNeededOnly = true): Observable<FieldOfStudy[]> {
    const options = LoadFieldsOfStudyActionOptions.forDepartment(departmentId);
    return this.generalResourcesStoreService.getFieldsOfStudy(options, ifNeededOnly);
  }

  public getFieldsOfStudyForId(id: IdType, ifNeededOnly = true): Observable<FieldOfStudy> {
    return this.generalResourcesStoreService.getFieldOfStudyForId(id, ifNeededOnly);
  }

  public getTimetableForId(id: IdType, ifNeededOnly = true): Observable<Timetable> {
    return this.generalResourcesStoreService.getTimetableForId(id, ifNeededOnly);
  }

  getDiplomaSessionsForFieldOfStudy(fieldOfStudyId: IdType): Observable<DiplomaSession[]> {
    const options = LoadDiplomaSessionsActionOptions.forFieldOfStudy(fieldOfStudyId);
    return this.generalResourcesStoreService.getDiplomaSessionsForKey(options);
  }

  getDiplomaSessionsForDepartment(departmentId: IdType): Observable<DiplomaSession[]> {
    const options = LoadDiplomaSessionsActionOptions.forDepartment(departmentId);
    return this.generalResourcesStoreService.getDiplomaSessionsForKey(options);
  }

  getDiplomaSessionForId(id: IdType): Observable<DiplomaSession> {
    return this.generalResourcesStoreService.getDiplomaSessionForId(id);
  }

  getNotifications(): Observable<NotificationTemplate[]> {
    return this.generalResourcesApiService.getNotifications();
  }

  modifyNotification(payload: NotificationTemplate): Observable<NotificationTemplate> {
    return this.generalResourcesApiService.modifyNotification(payload);
  }

  modifyTimetable(timetableId: IdType, payload: Timetable): Observable<Timetable> {
    return this.generalResourcesApiService.modifyTimetable(timetableId, payload).pipe(
      tap(() => {
        this.generalResourcesStoreService.invalidateStoreForKey(GeneralResourcesStateKey.TIMETABLES);
        this.generalResourcesStoreService.invalidateStoreForKey(GeneralResourcesStateKey.DIPLOMA_SESSIONS);
      })
    );
  }


}
