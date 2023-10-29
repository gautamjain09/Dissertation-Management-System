import { createAction, props } from '@ngrx/store';
import { AppLanguage } from '../../../core/models/app-language.model';
import { Context } from '../../models/context.model';


export const setContext = createAction('[SESSION] Set context', props<{ context?: Context }>());
export const setLanguageIfNeededAction = createAction('[SESSION] Set language if needed', props<{ language: AppLanguage }>());
export const setLanguageAction = createAction('[SESSION] Set language', props<{ language: AppLanguage }>());
