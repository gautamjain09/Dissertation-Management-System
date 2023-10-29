import { sessionFeatureName, sessionReducer } from './session.reducer';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SessionEffects } from './session.effects';


@NgModule({
  imports: [
    StoreModule.forFeature(sessionFeatureName, sessionReducer),
    EffectsModule.forFeature([SessionEffects])
  ]
})
export class SessionStoreModule {
}
