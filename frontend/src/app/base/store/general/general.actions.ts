import { createAction, props } from '@ngrx/store';
import { GeneralResourcesStateKey, GeneralResourceType } from './general.state';
import { IdType } from '../../models/dto/id.model';

export const loadTimetablesAction = createAction(
  '[GENERAL] Load timetables',
  props<{ options: LoadTimetablesActionOptions, key: string }>()
);
export const loadTimetablesIfNeededAction = createAction(
  '[GENERAL] Load timetables if needed',
  props<{ options: LoadTimetablesActionOptions, key: string }>()
);
export const loadTimetableForIdAction = createAction(
  '[GENERAL] Load timetable for id',
  props<{ id: IdType }>()
);
export const loadTimetableForIdIfNeededAction = createAction(
  '[GENERAL] Load timetable for id if needed',
  props<{ id: IdType }>()
);

export const loadDiplomaSessionsAction = createAction(
  '[GENERAL] Load diploma sessions',
  props<{ options: LoadDiplomaSessionsActionOptions, key: string }>()
);
export const loadDiplomaSessionsIfNeededAction = createAction(
  '[GENERAL] Load diploma sessions if needed',
  props<{ options: LoadDiplomaSessionsActionOptions, key: string }>()
);
export const loadDiplomaSessionForIdAction = createAction(
  '[GENERAL] Load diploma sessions for id',
  props<{ id: IdType }>()
);
export const loadDiplomaSessionForIdIfNeededAction = createAction(
  '[GENERAL] Load diploma sessions for id if needed',
  props<{ id: IdType }>()
);

export const loadDepartmentsAction = createAction(
  '[GENERAL] Load departments',
  props<{ options: LoadDepartmentsActionOptions, key: string }>()
);
export const loadDepartmentsIfNeededAction = createAction(
  '[GENERAL] Load departments if needed',
  props<{ options: LoadDepartmentsActionOptions, key: string }>()
);
export const loadDepartmentForIdAction = createAction(
  '[GENERAL] Load department for id',
  props<{ id: IdType }>()
);
export const loadDepartmentForIdIfNeededAction = createAction(
  '[GENERAL] Load department for id if needed',
  props<{ id: IdType }>()
);

export const loadFieldsOfStudyAction = createAction(
  '[GENERAL] Load fields of study',
  props<{ options: LoadFieldsOfStudyActionOptions, key: string }>()
);
export const loadFieldsOfStudyIfNeededAction = createAction(
  '[GENERAL] Load fields of study if needed',
  props<{ options: LoadFieldsOfStudyActionOptions, key: string }>()
);
export const loadFieldOfStudyForIdAction = createAction(
  '[GENERAL] Load field of study for id',
  props<{ id: IdType }>()
);
export const loadFieldOfStudyForIdIfNeededAction = createAction(
  '[GENERAL] Load field of study for id if needed',
  props<{ id: IdType }>()
);


export const invalidateGeneralResourcesAction = createAction(
  '[GENERAL] Invalidate store resource',
  props<{ resourceType: GeneralResourcesStateKey }>()
);

export const loadGeneralResourcesSuccessAction = createAction(
  '[GENERAL]  Load collection successful',
  props<{ resourceType: GeneralResourcesStateKey, collection: GeneralResourceType[], key: string }>()
);
export const loadGeneralResourceSuccessAction = createAction(
  '[GENERAL]  Load instance successful',
  props<{ resourceType: GeneralResourcesStateKey, instance: GeneralResourceType }>()
);

export const loadGeneralResourcesFailedAction = createAction(
  '[GENERAL] Load failed',
  props<{ error: any }>()
);


export class LoadTimetablesActionOptions {
  toKey(): string {
    return [
      'LoadTimetablesActionOptions'
    ].join('$');
  }
}

export class LoadDepartmentsActionOptions {
  toKey(): string {
    return [
      'LoadDepartmentsActionOptions'
    ].join('$');
  }
}

export class LoadFieldsOfStudyActionOptions {
  departmentId?: IdType;

  static forDepartment(departmentId: IdType): LoadFieldsOfStudyActionOptions {
    const options = new LoadFieldsOfStudyActionOptions();
    options.departmentId = departmentId;
    return options;
  }

  toKey(): string {
    return [
      'LoadFieldsOfStudyActionOptions',
      'DI_' + this.departmentId
    ].join('$');
  }
}

export class LoadDiplomaSessionsActionOptions {
  fieldOfStudyId?: IdType;
  departmentId?: IdType;

  static forFieldOfStudy(fieldOfStudyId: IdType): LoadDiplomaSessionsActionOptions {
    const options = new LoadDiplomaSessionsActionOptions();
    options.fieldOfStudyId = fieldOfStudyId;
    return options;
  }

  static forDepartment(departmentId: IdType): LoadDiplomaSessionsActionOptions {
    const options = new LoadDiplomaSessionsActionOptions();
    options.departmentId = departmentId;
    return options;
  }

  toKey(): string {
    return [
      'LoadDiplomaSessionsActionOptions',
      'FOSI_' + this.fieldOfStudyId,
      'DI_' + this.departmentId
    ].join('$');
  }
}
