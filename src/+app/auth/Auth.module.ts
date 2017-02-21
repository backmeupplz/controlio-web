import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormHelperModule } from '../FormHelper';
import { FormMessageService } from '../FormHelper';

import { RouterModule, Routes } from '@angular/router';

import { AccountRecoveryPageComponent, AccountRecovery } from './AccountRecovery';
import { SignIn, LoginComponent } from './SignIn';
import { SignUp, SignUpPage } from './SignUp';
import { LoggedInGuard } from './LoggedGuard';

const moduleRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'account-recovery', component: AccountRecoveryPageComponent },
  { path: 'signup', component: SignUpPage },
];

import { AppHeaders, AppHttp } from '../HTTPHelper';
import { AuthService } from './AuthServices';
import { UserAuthModel } from './models';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [],
  declarations: []
})
export class AuthServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [AuthService, UserAuthModel, AppHeaders, AppHttp, LoggedInGuard]
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
