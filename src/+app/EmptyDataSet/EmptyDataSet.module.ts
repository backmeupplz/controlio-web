import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyDataSetComponent }   from './EmptyDataSet.component';
import { ErrorHandlerModule } from '../ErrorHandler';

@NgModule({
      imports: [CommonModule, ErrorHandlerModule],
      exports: [EmptyDataSetComponent],
      declarations: [EmptyDataSetComponent],
})
export class EmptyDataSetModule {}
