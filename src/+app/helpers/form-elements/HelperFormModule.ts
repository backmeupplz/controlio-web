import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BemModule } from 'angular-bem';


import { MBootstrapModule } from '../bootstrap-components/MBootstrapModule.module';
import { ImageGaleryModule } from '../image-galery/ImageGaleryModule';






import { FormMessageService } from './message.service';
import { FilesUploadComponent } from './files-upload.component'


import { LimitInput } from './limit.component';
import { MessageForm } from './MessageForm.component';




/**
* Select
*/
import { SelectUser } from './select-user.component';
import { SelectComponent } from 'ng2-select/ng2-select';
import { OffClickDirective } from 'ng2-select/components/select/off-click';
import { HighlightPipe } from 'ng2-select/components/select/select-pipes';


/**
* Tag input
*/
import { Email } from './email.component';
import { TagInputComponent } from './tag-input/tag-input.component';
import { TagInputItemComponent } from './tag-input/tag-input-item.component';




import { AppHttp } from '../http/AppHttp.service';
import { AppHeaders } from '../http/AppHeaders.service';
import { BucketService } from '../../bucket/bucket.service';
import { FileUploadService } from './FileUploadService.service';
import { NativeWindow } from '../NativeWindow.service';
import { FileUploadButton } from './file-upload-button.component';
import { ImportFileElement } from './file-upload.component';


import { ButtonComponent } from './Button/Button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ImageGaleryModule,
    BemModule,
    MBootstrapModule
  ],
  declarations: [
    LimitInput,
    MessageForm,

    Email,
    TagInputComponent,
    TagInputItemComponent,

    SelectUser,
    SelectComponent,
    OffClickDirective,
    HighlightPipe,


    FileUploadButton,
    FilesUploadComponent,
    ImportFileElement,

    ButtonComponent
  ],
  providers: [
    AppHttp, AppHeaders,
    FormMessageService,
    FileUploadService,
    BucketService,
    NativeWindow
  ],
  exports: [
    LimitInput,
    ImportFileElement,
    Email,
    SelectUser,
    FileUploadButton,
    MessageForm,
    ButtonComponent,
    FilesUploadComponent
  ]
})
export class HelperFormModule {}
