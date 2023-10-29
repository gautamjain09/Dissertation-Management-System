import { requestsFeatureName, requestsReducer } from './requests.reducer';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RequestsEffects } from './requests.effects';


@NgModule({
  imports: [
    StoreModule.forFeature(requestsFeatureName, requestsReducer),
    EffectsModule.forFeature([RequestsEffects])
  ]
})
export class RequestsStoreModule {
}
