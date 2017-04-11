import { NgModule } from '@angular/core';
import { ProjectListElem }   from './project_list_elem.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BemModule } from 'angular-bem';
import { SvgModule } from '../../Svg';
import { ImageModule } from '../../Image';
import { MomentModule } from 'angular2-moment';
// import { FormHelperModule } from '../../FormHelper';
@NgModule({
      imports: [CommonModule, RouterModule, BemModule, SvgModule, ImageModule, MomentModule],
      exports: [ProjectListElem],
      declarations: [ProjectListElem],
      providers: [],
})
export class ProjectTemplateModule {}
