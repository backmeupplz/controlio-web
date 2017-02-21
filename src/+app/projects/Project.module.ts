import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '../auth';
import { SvgModule } from '../Svg';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { MBootstrapModule } from '../helpers/bootstrap-components/MBootstrapModule.module';
import { AddProject, AddProjectPage } from './AddProject';
// import { EditProject, EditProjectPage } from './EditProject';
// import { Project } from './Project';
import { Projects } from './Projects';
import { SearchComponent } from './Search';
import { FormHelperModule } from '../FormHelper';
import { ProjectService } from './ProjectServices';

const moduleRoutes: Routes = [
  { path: 'projects', component: Projects, canActivate: [LoggedInGuard] },
  { path: 'project/add', component: AddProjectPage, canActivate: [LoggedInGuard] },
  // { path: 'project/:id', component: Project, canActivate: [LoggedInGuard] },
  // { path: 'project/edit/:id', component: EditProjectPage, canActivate: [LoggedInGuard] },
];

@NgModule({
  imports: [
    MBootstrapModule,
    FormsModule,
    FormHelperModule,
    ReactiveFormsModule,
    CommonModule,
    SvgModule,
    RouterModule.forRoot(moduleRoutes)
  ],
  exports: [
    SearchComponent,
    AddProject,
    AddProjectPage,
    // Project,
    Projects,
    // EditProject
  ],
  declarations: [
    SearchComponent,
    AddProject,
    AddProjectPage,
    // Project,
    Projects,
    // EditProject
  ],
  providers: [ProjectService],
})
export class ProjectModule {}
