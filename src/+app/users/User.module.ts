import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '../auth';
import { NavigationModule } from '../Navigation';
import { AppHttp } from '../HTTPHelper';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { EditUser, UserEditPage } from './EditProfile';
import { ProfileComponent } from './Profile';
import { UserService } from './UserServices';
import { FormHelperModule } from '../FormHelper';
import { AuthServiceModule } from '../auth';
import { ImageModule } from '../Image';
import { FIleUploaderModule } from '../FileUploader';

const moduleRoutes: Routes = [
  { path: 'profile/edit', component: UserEditPage, canActivate: [LoggedInGuard] },
  { path: 'profile', component: ProfileComponent },
];


@NgModule({
  imports: [
    FIleUploaderModule,
    AuthServiceModule,
    FormsModule,
    ReactiveFormsModule,
    FormHelperModule,
    CommonModule,
    NavigationModule,
    RouterModule.forRoot(moduleRoutes),
    ImageModule
  ],
  exports: [],
  declarations: [
    EditUser,
    UserEditPage,
    ProfileComponent
  ],
  providers: [
    UserService,
    AppHttp
  ],
})
export class UserModule {}
