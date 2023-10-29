import { ChangeDetectorRef, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppLanguage } from '../models/app-language.model';
import { CleanableService } from './cleanable.service';
import { Dictionary } from '../models/dictionary.model';
import { Cleanable } from '../components/cleanable.directive';
import { SettingsService } from './settings.service';
import { SessionService } from '../../base/services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AppTranslateService implements CleanableService {

  private localesByLang: Dictionary<string> = {
    [AppLanguage.POLISH]: 'pl',
    [AppLanguage.ENGLISH]: 'en-US'
  };

  constructor(private readonly settingsService: SettingsService,
              private readonly translateService: TranslateService,
              private readonly sessionService: SessionService) {
  }

  get defaultLanguage(): AppLanguage {
    return this.settingsService.getDefaultLanguage();
  }

  public init(cleanable: Cleanable, changeDetector: ChangeDetectorRef): void {
    this.setDefault();
    cleanable.addSubscription(
      this.sessionService.getLanguage().subscribe(language => {
        this.translateService.use(language);
        changeDetector.markForCheck();
      })
    );
  }

  private setDefault(): void {
    const defaultLang = this.settingsService.getDefaultLanguage();
    this.translateService.setDefaultLang(defaultLang);
  }

  public getCurrentLanguage(): AppLanguage {
    return this.translateService.currentLang as AppLanguage;
  }

  public getLocale(): string {
    return this.localesByLang[this.translateService.currentLang];
  }

}
