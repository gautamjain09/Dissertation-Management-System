import { BaseStoreState, StoreResource } from '../../../core/store/base-store-state.model';
import { Timetable } from '../../models/dto/timetable.model';
import { DiplomaSession } from '../../models/dto/diploma-session.model';
import { FieldOfStudy } from '../../models/dto/field-of-study.model';
import { Department } from '../../models/dto/department.model';

export type GeneralResourceType = Timetable | DiplomaSession | FieldOfStudy | Department;


export enum GeneralResourcesStateKey {
  TIMETABLES = 'TIMETABLES',
  DIPLOMA_SESSIONS = 'DIPLOMA_SESSIONS',
  FIELDS_OF_STUDY = 'FIELDS_OF_STUDY',
  DEPARTMENTS = 'DEPARTMENTS',
}

export class GeneralState extends BaseStoreState {
  [GeneralResourcesStateKey.TIMETABLES] = new StoreResource<Timetable>();
  [GeneralResourcesStateKey.DIPLOMA_SESSIONS] = new StoreResource<DiplomaSession>();
  [GeneralResourcesStateKey.FIELDS_OF_STUDY] = new StoreResource<FieldOfStudy>();
  [GeneralResourcesStateKey.DEPARTMENTS] = new StoreResource<Department>();
}
