import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '../auth';

import { AddProject, AddProjectPage } from './AddProject';
import { EditProject, EditProjectPage } from './EditProject';
import { Project } from './Project';
import { Projects } from './Projects';
import { SearchComponent } from './Search';

import { ProjectService } from './ProjectServices';

const moduleRoutes: Routes = [
  { path: 'projects', component: Projects, canActivate: [LoggedInGuard] },
  { path: 'project/add', component: AddProjectPage, canActivate: [LoggedInGuard] },
  { path: 'project/:id', component: Project, canActivate: [LoggedInGuard] },
  { path: 'project/edit/:id', component: EditProjectPage, canActivate: [LoggedInGuard] },
];

@NgModule({
      imports: [
        RouterModule.forRoot(moduleRoutes)
      ],
      exports: [
        SearchComponent,
        AddProject,
        Project,
        Projects,
        EditProject
      ],
      declarations: [
        SearchComponent,
        AddProject,
        Project,
        Projects,
        EditProject
      ],
      providers: [ProjectService],
})
export class ProjectModule {}
