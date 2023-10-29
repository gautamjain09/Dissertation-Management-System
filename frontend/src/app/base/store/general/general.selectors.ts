import { createFeatureSelector, createSelector } from '@ngrx/store';
import { generalFeatureName } from './general.reducer';
import { GeneralResourcesStateKey, GeneralState } from './general.state';
import { AppState } from '../app-state.model';
import { forIdSelector, forKeySelector, StoreResource } from '../../../core/store/base-store-state.model';
import { Department } from '../../models/dto/department.model';
import { DiplomaSession } from '../../models/dto/diploma-session.model';
import { FieldOfStudy } from '../../models/dto/field-of-study.model';
import { Timetable } from '../../models/dto/timetable.model';
import { IdType } from '../../models/dto/id.model';


export const selectGeneralState = createFeatureSelector<GeneralState>(generalFeatureName);
export const selectGeneralStateInProgress = createSelector(selectGeneralState, state => state.isInProgress);
export const selectGeneralStateError = createSelector(selectGeneralState, state => state.error);

export const selectDiplomaSessionsStoreResource = createSelector(selectGeneralState, state => state[GeneralResourcesStateKey.DIPLOMA_SESSIONS]);
export const selectDiplomaSessionsForKey = createSelector<AppState, string, StoreResource<DiplomaSession>, DiplomaSession[] | undefined>(
  selectDiplomaSessionsStoreResource, forKeySelector
);
export const selectDiplomaSessionForId = createSelector<AppState, IdType, StoreResource<DiplomaSession>, DiplomaSession | undefined>(
  selectDiplomaSessionsStoreResource, forIdSelector
);

export const selectDepartmentsStoreResource = createSelector(selectGeneralState, state => state[GeneralResourcesStateKey.DEPARTMENTS]);
export const selectDepartmentsForKey = createSelector<AppState, string, StoreResource<Department>, Department[] | undefined>(
  selectDepartmentsStoreResource, forKeySelector
);
export const selectDepartmentForId = createSelector<AppState, IdType, StoreResource<Department>, Department | undefined>(
  selectDepartmentsStoreResource, forIdSelector
);

export const selectFieldsOfStudyStoreResource = createSelector(selectGeneralState, state => state[GeneralResourcesStateKey.FIELDS_OF_STUDY]);
export const selectFieldsOfStudyForKey = createSelector<AppState, string, StoreResource<FieldOfStudy>, FieldOfStudy[] | undefined>(
  selectFieldsOfStudyStoreResource, forKeySelector
);
export const selectFieldOfStudyForId = createSelector<AppState, IdType, StoreResource<FieldOfStudy>, FieldOfStudy | undefined>(
  selectFieldsOfStudyStoreResource, forIdSelector
);

export const selectTimetablesStoreResource = createSelector(selectGeneralState, state => state[GeneralResourcesStateKey.TIMETABLES]);
export const selectTimetablesForKey = createSelector<AppState, string, StoreResource<Timetable>, Timetable[] | undefined>(
  selectTimetablesStoreResource, forKeySelector
);
export const selectTimetableForId = createSelector<AppState, IdType, StoreResource<Timetable>, Timetable | undefined>(
  selectTimetablesStoreResource, forIdSelector
);
