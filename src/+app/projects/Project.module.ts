import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InfiniteScrollModule } from 'angular2-infinite-scroll/angular2-infinite-scroll';
import { MenuBlockModule } from '../Navigation/MenuBlock';
import { BemModule } from 'angular-bem';
import { LoggedInGuard } from '../auth';
import { SvgModule } from '../Svg';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { BootstrapHelperModule } from '../BootstrapHelper';
import { AddProject, AddProjectPage } from './AddProject';
import { ImageModule } from '../Image';

import { EditProject, EditProjectPage } from './EditProject';
import { Project } from './Project';
import { Projects } from './Projects';
import { MomentModule } from 'angular2-moment';
import { SearchComponent } from './Search';
import { FormHelperModule, MessageFormModule } from '../FormHelper';
import { ProjectService } from './ProjectServices';
import { ProjectListElem } from './Project/project_list_elem.component';
import { FIleUploaderModule } from '../FileUploader';
import { PostModule } from '../posts';

import { InviteModule } from '../invites';

import { EmptyDataSetModule } from '../EmptyDataSet';
import { HTTPHelperModule } from '../HTTPHelper';

const moduleRoutes: Routes = [
  { path: 'projects', component: Projects, canActivate: [LoggedInGuard] },
  { path: 'project/add', component: AddProjectPage, canActivate: [LoggedInGuard] },
  { path: 'project/:id', component: Project, canActivate: [LoggedInGuard] },
  { path: 'project/edit/:id', component: EditProjectPage, canActivate: [LoggedInGuard] },
];

@NgModule({
  imports: [
    InviteModule,
    HTTPHelperModule,
    EmptyDataSetModule,
    ImageModule,
    BemModule,
    MenuBlockModule,
    MomentModule,
    BootstrapHelperModule,
    FormsModule,
    InfiniteScrollModule,
    FormHelperModule,
    MessageFormModule,
    ReactiveFormsModule,
    CommonModule,
    SvgModule,
    RouterModule.forRoot(moduleRoutes),
    FIleUploaderModule,
    PostModule
  ],
  exports: [
    SearchComponent,
    AddProject,
    AddProjectPage,
    ProjectListElem,
    Project,
    Projects,
    EditProject,
    EditProjectPage
  ],
  declarations: [
    SearchComponent,
    AddProject,
    AddProjectPage,
    Project,
    Projects,
    ProjectListElem,
    EditProject,
    EditProjectPage
  ],
  providers: [ProjectService],
})
export class ProjectModule {}
