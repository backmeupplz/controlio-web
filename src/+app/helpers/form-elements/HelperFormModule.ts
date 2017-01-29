import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { MBootstrapModule } from '../bootstrap-components/MBootstrapModule.module';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from 'ng2-select/ng2-select';

import { OffClickDirective } from 'ng2-select/components/select/off-click';
import { HighlightPipe } from 'ng2-select/components/select/select-pipes';

import { LimitInput } from './limit.component';
import { MessageForm } from './MessageForm.component';

import { ImportFileElement } from './file-upload.component';
import { FileUploadButton } from './file-upload-button.component';


import { Email } from './email.component';
import { SelectUser } from './select-user.component';
import { FormMessageService } from './message.service';

import {TagInputComponent} from './tag-input/tag-input.component';
import {TagInputItemComponent} from './tag-input/tag-input-item.component';
import { FileUploadService } from './FileUploadService.service';

import { BucketService } from '../../bucket/bucket.service';
import { NativeWindow } from '../NativeWindow.service';
import { ImageGaleryModule } from '../image-galery/ImageGaleryModule';

import { ButtonComponent } from './Button/Button.component';
import { SvgIconComponent } from './SvgIcon.component';

import { BemModule } from 'angular-bem';
import { AppHttp } from '../http/AppHttp.service';
import { AppHeaders } from '../http/AppHeaders.service';
//import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';
//import { FileUploadModule } from "ng2-file-upload/file-upload/file-upload.module"

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ImageGaleryModule,
    BemModule,
    MBootstrapModule,
    //FileUploadModule
  ],
  declarations: [
    //FileSelectDirective,
    //FileDropDirective,
    LimitInput,
    ImportFileElement,
    Email,
    SelectUser,
    TagInputComponent,
    TagInputItemComponent,
    SelectComponent,
    OffClickDirective,
    HighlightPipe,
    FileUploadButton,
    MessageForm,
    ButtonComponent,
    SvgIconComponent
  ],
  providers: [
  AppHttp, AppHeaders,
  FormMessageService, FileUploadService, BucketService, NativeWindow
  ],
  exports: [
    LimitInput,
    ImportFileElement,
    Email,
    SelectUser,
    FileUploadButton,
    MessageForm,
    ButtonComponent,
    SvgIconComponent
  ]
})
export class HelperFormModule {}
