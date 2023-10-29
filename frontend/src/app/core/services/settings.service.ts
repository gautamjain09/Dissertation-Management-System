import { Injectable } from '@angular/core';
import { finalEnvironment } from '../../../environments/final-enviroment';
import { ApiLabel } from '../models/api-route.model';
import { AppLanguage } from '../models/app-language.model';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private get environments(): typeof finalEnvironment {
    return finalEnvironment;
  }

  get serverConfig(): typeof finalEnvironment.serverConfig {
    return this.environments.serverConfig;
  }

  get fakeApiConfig(): typeof finalEnvironment.fakeApi {
    return this.environments.fakeApi;
  }

  get serverBaseUrl(): string {
    return this.serverConfig.base;
  }

  get authServerBaseUrl(): string {
    return this.serverConfig.authBase;
  }

  getServerApi(apiLabel: ApiLabel): string {
    return this.serverConfig.api[apiLabel];
  }

  getDefaultLanguage(): AppLanguage {
    return this.environments.defaultLanguage;
  }

  isFakeApiEnabled(): boolean {
    return this.fakeApiConfig.enabled;
  }

  fakeApiDelay(): number {
    return this.fakeApiConfig.delayTime;
  }

  isProduction(): boolean {
    return this.environments.production;
  }

}
