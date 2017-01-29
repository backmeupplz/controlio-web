import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Projects } from './projects/projects.component';
import { Project } from './projects/project.component';
import { Plans } from './plans/plans.component';
import { Managers } from './managers/managers.component';
import { Support } from './support/support.component';
import { AboutControlio } from './pages/about_controlio.component';
import { SignIn } from './auth/signin.component';
import { LoginComponent } from './auth/login.component';
import { SignUpPage } from './auth/signup-page.component';
import { RegisterComponent } from './auth/register.component';
import { ProfileComponent } from './users/profile.component';
import { LoggedInGuard } from './auth/logged-in.guard';
import { AccountRecoveryModal } from "./auth/account-recovery-modal";
import { MainPage } from "./index.component";
import { ErrorPage } from "./pages/error-page.component";
import { Cards } from './plans/cards.component';
import { UserEditPage } from './users/user-edit-page.component';
import { AddProjectPage } from './projects/add-project-page.component';

const appRoutes: Routes = [
  { path: 'profile/edit', component: UserEditPage },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: SignUpPage },
  { path: 'reg', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [LoggedInGuard] },
  { path: 'signin', component: SignIn },
  { path: 'projects', component: Projects, canActivate: [LoggedInGuard] },
  { path: 'project/add', component: AddProjectPage, canActivate: [LoggedInGuard] },
  { path: 'project/:id', component: Project, canActivate: [LoggedInGuard] },
  { path: 'managers', component: Managers, canActivate: [LoggedInGuard] },
  { path: 'plans', component: Plans, canActivate: [LoggedInGuard] },
  { path: 'support', component: Support, canActivate: [LoggedInGuard] },
  { path: 'cards', component: Cards, canActivate: [LoggedInGuard] },
  { path: '', component: MainPage, pathMatch: 'full' },
  { path: 'main', component: MainPage },
  { path: 'about', component: AboutControlio },
  { path: '**', component: ErrorPage }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
