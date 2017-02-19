import { NgModule } from '@angular/core';
import { MenuBlockComponent }   from './MenuBlock.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@NgModule({
      imports: [CommonModule, RouterModule],
      exports: [MenuBlockComponent],
      declarations: [MenuBlockComponent],
      providers: [],
})
export class MenuBlockModule {  }
