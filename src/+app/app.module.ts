import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { routing, appRoutingProviders }  from './app.routing';

import { MomentModule } from 'angular2-moment';
import { BemModule } from 'angular-bem';




import { AppComponent }   from './app.component';


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
import { AccountRecovery } from './auth/account_recovery.component';
import { LoggedInGuard } from './auth/logged-in.guard';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { SignUpPage } from './auth/signup-page.component';



/**
*  ? ? ? ?
*/
// import { SelectComponent  } from 'ng2-select';
// import { ClickOutsideModule } from 'ng2-click-outside';
// import { ButtonWithLoading } from './helpers/button-with-loading.component';
//import {TagInputComponent} from './helpers/form-elements/tag-input/tag-input.component';
//import {TagInputItemComponent} from './helpers/form-elements/tag-input/tag-input-item.component';


/**
* Manager
*/
import { AddManager } from './managers/add-manager.component';
import { Managers } from './managers/managers.component';


/**
* Support
*/
import { Support } from './support/support.component';


/**
*  Modals
*/
// import { ModalModule } from "ng2-modal";
// import { ModalWindow } from './helpers/modal-window.component';
// import { EditProjectModal } from './projects/edit-project-modal';
// import { AddProjectModal } from './projects/add-project-modal';
// import { UserProfileModal }  from './users/user-profile.modal';
// import { SignInModal } from "./auth/signin-modal";
// import { AccountRecoveryModal } from "./auth/account-recovery-modal";
// import { SignUpModal } from "./auth/signup-modal";
//import { AddManagerModal } from './managers/add-manager-modal.component';


/**
*  Nav
*/
import { MenuBlock } from './nav/top_block.component';
// import { WindowSize } from "./nav/window_size";
import { UserDropDownList } from './nav/user-drop-down-list.component';
import { BurgerDropDownList } from './nav/burger-drop-down-list.component';
import { LanguageDropDownList } from './nav/language-drop-down-list.component';
import { MenuCenter } from './nav/menu-center';
//import { AppModalCenter } from "./helpers/modal-center.component";


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

/**
* Bucket
*/
//import { BucketService } from './bucket/bucket.service';



@NgModule({
  imports:      [
  BrowserModule,
  SharedModule,
   routing,
  // ModalModule,
  HttpModule,
  FormsModule,
  ReactiveFormsModule,
  // ClickOutsideModule,
  MomentModule,
  HelperFormModule,
  ImageGaleryModule,
  BemModule,
  MBootstrapModule
],
  declarations: [
    // AddManagerModal,
    ErrorMessageComponent,
    InvalidErrorMessageComponent,

     LanguageDropDownList,
     BurgerDropDownList,
     UserDropDownList,
    //TagInputComponent,
    //TagInputItemComponent,
    AppComponent,
    AddProjectPage,

    MenuBlock,
    MainPage,
    ErrorPage,
    Projects,
    Project,
    Post,
    Plans,
    Stripe,
    Managers,
    Support,
    AboutControlio,
    ProjectListElem,
    SignIn,
    SignUp,
    AccountRecovery,

    // ModalWindow,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    // SignInModal,
    SignUpPage,
    // AccountRecoveryModal,
    // SignUpModal,
    // AddProjectModal,
    AddProject,
    // AppModalCenter,
    //SelectComponent,
    //HighlightPipe,
    AddManager,
    // EditProjectModal,
    EditProject,
    UserSmallInfoComponent,
    // UserProfileModal,
    EditUser,
    // ButtonWithLoading,
    Cards,
    UserEditPage
  ],
  providers: [
    appRoutingProviders,
    UserService,
    // WindowSize,

    ProjectService,
    PostService,
    LoggedInGuard,
    // BucketService,
    // AppModalCenter,
    MenuCenter,
    AppHeaders,
    PaymentsService,
    AppHttp
  ]
})
export class AppModule { }
export { AppComponent } from './app.component';
