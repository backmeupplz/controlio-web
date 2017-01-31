import { NgModule }      from '@angular/core';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';

import { routing, appRoutingProviders }  from './app.routing';

import { MomentModule } from 'angular2-moment';
import { BemModule } from 'angular-bem';

import { AppComponent, XLargeDirective }   from './app.component';


/**
*  Modules
*/
import { MBootstrapModule } from './helpers/bootstrap-components/MBootstrapModule.module';
import { SharedModule } from './shared/shared.module';
import { HelperFormModule } from './helpers/form-elements/HelperFormModule';
import { ImageGaleryModule } from './helpers/image-galery/ImageGaleryModule';


/**
*  Auth
*/
import { SignIn } from './auth/signin.component';
import { SignUp } from './auth/signup.component';
// import { AccountRecovery } from './auth/account_recovery.component';
import { LoggedInGuard } from './auth/logged-in.guard';
import { LoginComponent } from './auth/login.component';
// import { RegisterComponent } from './auth/register.component';
import { SignUpPage } from './auth/signup-page.component';


/**
* Support
*/
import { Support } from './support/support.component';


/**
*  Nav
*/
import { MenuBlock } from './nav/top_block.component';
import { UserDropDownList } from './nav/user-drop-down-list.component';
import { BurgerDropDownList } from './nav/burger-drop-down-list.component';
import { LanguageDropDownList } from './nav/language-drop-down-list.component';
import { MenuCenter } from './nav/menu-center';


/**
*  Payments
*/
import { Plans } from './plans/plans.component';
import { Stripe } from './plans/stripe.component';
import { PaymentsService } from './plans/payments.service';
import { Cards } from './plans/cards.component';

/**
*  Project
*/
import { ProjectListElem } from './projects/project_list_elem.component';
import { Projects } from './projects/projects.component';
import { Project } from './projects/project.component';
import { ProjectService } from './projects/project.service';
import { AddProject } from './projects/add-project.component';
import { AddProjectPage } from './projects/add-project-page.component';
import { EditProject } from './projects/edit-project.component';
import { EditProjectPage } from './projects/edit-project-page.component';

/**
*  Post
*/
import { Post } from './posts/post.component';
import { PostService } from './posts/posts.service';


/**
* User
**/
import { UserService } from './users/user.service';
import { EditUser }  from './users/edit-user.component';
import { ProfileComponent } from './users/profile.component';
import { UserSmallInfoComponent } from './users/user-small-info.component';



/**
* Pages
*/
import { MainPage } from "./index.component";
import { ErrorPage } from "./pages/error-page.component";
import { AboutControlio } from './pages/about_controlio.component';
import { UserEditPage } from './users/user-edit-page.component';


/**
* Helpers
**/
import { AppHeaders } from './helpers/http/AppHeaders.service';
import { ErrorMessageComponent } from './helpers/error-message.component';
import { InvalidErrorMessageComponent } from './helpers/invalid-error-message.component';
import { AppHttp } from './helpers/http/AppHttp.service';


@NgModule({
  imports:      [
  SharedModule,
  routing,
  FormsModule,
  ReactiveFormsModule,
  MomentModule,
  HelperFormModule,
  ImageGaleryModule,
  BemModule,
  MBootstrapModule
],
  declarations: [
    ErrorMessageComponent,
    InvalidErrorMessageComponent,
    AppComponent,
    AddProjectPage,

    MenuBlock,
    LanguageDropDownList,
    BurgerDropDownList,
    UserDropDownList,

    MainPage,
    ErrorPage,
    Projects,
    Project,
    Post,
    Plans,
    Stripe,

    Support,
    AboutControlio,
    ProjectListElem,
    EditProjectPage,
    SignIn,
    SignUp,
    // AccountRecovery,
    LoginComponent,
    // RegisterComponent,
    ProfileComponent,
    SignUpPage,
    AddProject,
    // AddManager,
    EditProject,
    UserSmallInfoComponent,
    EditUser,
    Cards,
    UserEditPage,
    XLargeDirective
  ],
  providers: [
    appRoutingProviders,
    UserService,
    ProjectService,
    PostService,
    LoggedInGuard,
    MenuCenter,
    AppHeaders,
    PaymentsService,
    AppHttp
  ]
})
export class AppModule { }
export { AppComponent } from './app.component';
