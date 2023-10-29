import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/root/app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModuleConfig } from '@ngx-translate/core/public_api';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from '../modules/login/login.module';
import { CoreModule } from '../core/core.module';
import { AppHeaderComponent } from './components/header/app-header.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../modules/shared/shared.module';
import { AdminModule } from '../modules/admin/admin.module';
import { StudentModule } from '../modules/student/student.module';
import { localStorageSync } from 'ngrx-store-localstorage';
import { authFeatureName } from '../base/store/auth/auth.reducer';
import { DeanModule } from '../modules/dean/dean.module';
import { LecturerModule } from '../modules/lecturer/lecturer.module';
import { CoordinatorModule } from '../modules/coordinator/coordinator.module';
import { DiplomaSectionModule } from '../modules/section/diploma-section.module';
import { ProgramCommitteeModule } from '../modules/committee/program-committee.module';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { clearStoreMetaReducer } from '../core/store/clear-store.reducer';
import { AuthInterceptor } from '../base/interceptors/auth.interceptor';
import { sessionFeatureName } from '../base/store/session/session.reducer';
import { BaseModule } from '../base/base.module';
import { SpinnerInterceptor } from '../base/interceptors/spinner.interceptor';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const translateConfig: TranslateModuleConfig = {
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }
};

const localStorageSyncReducer = localStorageSync({
  keys: [
    { [authFeatureName]: ['authData'] },
    { [sessionFeatureName]: ['language', 'contextRole'] }
  ],
  rehydrate: true
});


const metaReducers = [localStorageSyncReducer, clearStoreMetaReducer];

registerLocaleData(localePl);


@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(translateConfig),
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}, { metaReducers }),
    NgxSpinnerModule,
    SharedModule,
    CoreModule,
    BaseModule,
    LoginModule,
    AdminModule,
    StudentModule,
    DeanModule,
    LecturerModule,
    CoordinatorModule,
    DiplomaSectionModule,
    ProgramCommitteeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
