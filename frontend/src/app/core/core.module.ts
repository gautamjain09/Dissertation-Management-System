import { NgModule } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../modules/shared/shared.module";

@NgModule({
  declarations: [],
  imports: [
    SharedModule
  ],
  exports: [
    CommonModule,
    TranslateModule
  ]
})
export class CoreModule {
}
