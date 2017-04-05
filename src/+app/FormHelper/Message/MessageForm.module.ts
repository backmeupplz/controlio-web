import { NgModule } from '@angular/core';
import { MessageForm }   from './MessageForm.component';
import { CommonModule } from '@angular/common';
import { FIleUploaderModule } from '../../FileUploader';
import { CollectionModule } from '../../Collection';
import { FormHelperModule } from '../FormHelper.module';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { BemModule } from 'angular-bem';

@NgModule({
      imports: [BemModule, CommonModule, FIleUploaderModule, CollectionModule, FormHelperModule, FormsModule,  ReactiveFormsModule],
      exports: [MessageForm],
      declarations: [MessageForm],
      providers: [],
})
export class MessageFormModule {}
