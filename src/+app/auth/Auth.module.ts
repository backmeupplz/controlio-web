import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormHelperModule } from '../FormHelper';
import { FormMessageService } from '../FormHelper';

import { RouterModule, Routes } from '@angular/router';

import { AccountRecoveryPageComponent, AccountRecovery } from './AccountRecovery';
import { SignIn, LoginComponent } from './SignIn';
import { SignUp, SignUpPage } from './SignUp';
import { LoggedInGuard, NotLoggedInGuard } from './LoggedGuard';

const moduleRoutes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NotLoggedInGuard] },
  { path: 'signin', component: LoginComponent, canActivate: [NotLoggedInGuard] },
  { path: 'account-recovery', component: AccountRecoveryPageComponent, canActivate: [NotLoggedInGuard] },
  { path: 'signup', component: SignUpPage, canActivate: [NotLoggedInGuard] },
];

import { HTTPHelperModule } from '../HTTPHelper';
import { AuthService } from './AuthServices';
import { UserAuthModel } from './models';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    HTTPHelperModule
  ],
  exports: [],
  declarations: []
})
export class AuthServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [AuthService, UserAuthModel, LoggedInGuard, NotLoggedInGuard]
    }
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormHelperModule,
    SharedModule,
    RouterModule.forChild(moduleRoutes),
    AuthServiceModule
  ],
  exports: [],
  declarations: [
    AccountRecoveryPageComponent, AccountRecovery,
    SignIn, LoginComponent,
    SignUp, SignUpPage
  ],
  providers: [FormMessageService]
})
export class AuthModule {}
