import { NgModule } from '@angular/core';
import { BemModule } from 'angular-bem';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { routing, appRoutingProviders }  from './app.routing';
import { AuthService, AuthModule, AuthServiceModule } from './auth';

import { BootstrapHelperModule } from './BootstrapHelper';
import { SharedModule } from './shared/shared.module';
import { NavigationModule } from './Navigation';

import { MainPageComponent } from "./MainPage";
import { ErrorPage } from "./pages/error-page.component";
import { AboutControlio } from './pages/about_controlio.component';

import { UserModule } from './users';
import { SupportModule } from './support';
import { ProjectModule } from './projects';

@NgModule({
  imports:      [
    SupportModule,
    AuthModule,
    AuthServiceModule.forRoot(),
    SharedModule,
    routing,
    BemModule,
    BootstrapHelperModule,
    NavigationModule,
    UserModule,
    ProjectModule
  ],
  declarations: [
    AppComponent,
    MainPageComponent,
    ErrorPage,
    AboutControlio,

  ],
  providers: [
    appRoutingProviders,
    CookieService,
    AppConfig
  ]
})
export class AppModule { }
export { AppComponent } from './app.component';
