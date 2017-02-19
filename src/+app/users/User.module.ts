import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '../auth';
import { NavigationModule } from '../Navigation';
import { AppHttp } from '../HTTPHelper';

// import { EditUser, UserEditPage } from './EditProfile';
import { ProfileComponent } from './Profile';
import { UserService } from './UserServices';

const moduleRoutes: Routes = [
  // { path: 'profile/edit', component: UserEditPage, canActivate: [LoggedInGuard] },
  { path: 'profile', component: ProfileComponent },
];


@NgModule({
  imports: [
    CommonModule,
    NavigationModule,
    RouterModule.forRoot(moduleRoutes)
  ],
  exports: [
    // UserSmallInfoComponent
  ],
  declarations: [
    // EditUser,
    // UserEditPage,
    ProfileComponent
  ],
  providers: [
    UserService,
    AppHttp
  ],
})
export class UserModule {}
