import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InfiniteScrollModule } from 'angular2-infinite-scroll/angular2-infinite-scroll';
import { MenuBlockModule } from '../Navigation/MenuBlock';

import { LoggedInGuard } from '../auth';
import { SvgModule } from '../Svg';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { BootstrapHelperModule } from '../BootstrapHelper';
import { AddProject, AddProjectPage } from './AddProject';

// import { EditProject, EditProjectPage } from './EditProject';
import { Project } from './Project';
import { Projects } from './Projects';
import { MomentModule } from 'angular2-moment';
import { SearchComponent } from './Search';
import { FormHelperModule } from '../FormHelper';
import { ProjectService } from './ProjectServices';
import { ProjectListElem } from './Project/project_list_elem.component';
import { FIleUploaderModule } from '../FileUploader';

const moduleRoutes: Routes = [
  { path: 'projects', component: Projects, canActivate: [LoggedInGuard] },
  { path: 'project/add', component: AddProjectPage, canActivate: [LoggedInGuard] },
  { path: 'project/:id', component: Project, canActivate: [LoggedInGuard] },
  // { path: 'project/edit/:id', component: EditProjectPage, canActivate: [LoggedInGuard] },
];

@NgModule({
  imports: [
    MenuBlockModule,
    MomentModule,
    BootstrapHelperModule,
    FormsModule,
    InfiniteScrollModule,
    FormHelperModule,
    ReactiveFormsModule,
    CommonModule,
    SvgModule,
    RouterModule.forRoot(moduleRoutes),
    FIleUploaderModule
  ],
  exports: [
    SearchComponent,
    AddProject,
    AddProjectPage,
    ProjectListElem,
    Project,
    Projects,
    // EditProject
  ],
  declarations: [
    SearchComponent,
    AddProject,
    AddProjectPage,
    Project,
    Projects,
    ProjectListElem
    // EditProject
  ],
  providers: [ProjectService],
})
export class ProjectModule {}
