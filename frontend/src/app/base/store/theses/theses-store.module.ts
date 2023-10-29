import { thesesFeatureName, thesesReducer } from './theses.reducer';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ThesesEffects } from './theses.effects';


@NgModule({
  imports: [
    StoreModule.forFeature(thesesFeatureName, thesesReducer),
    EffectsModule.forFeature([ThesesEffects])
  ]
})
export class ThesesStoreModule {
}
