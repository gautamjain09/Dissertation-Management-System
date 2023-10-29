import { Pipe, PipeTransform } from "@angular/core";
import { DatePipe } from "@angular/common";
import { AppTranslateService } from "../../../core/services/app-translate.service";

@Pipe({ name: 'localDate', pure: false })
export class LocalDatePipe implements PipeTransform {

  constructor(private readonly translateService: AppTranslateService) {
  }

  transform(value: Date | string | number, format: string = 'fullDate', timezone?: string): string | null {
    const datePipe = new DatePipe(this.translateService.getLocale());
    return datePipe.transform(value, format, timezone);
  }
}
