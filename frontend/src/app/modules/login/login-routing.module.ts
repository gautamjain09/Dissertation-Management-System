import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { LoginPageGuard } from "../../core/guards/login-page.guard";

const routes: Routes = [
  {
    path: 'login',
    canActivate: [LoginPageGuard],
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
