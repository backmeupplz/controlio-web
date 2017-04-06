import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormHelperModule } from '../FormHelper';
import { BootstrapHelperModule } from '../BootstrapHelper';
import { FileUploadService, FileKeyGenService, FileFactoryService } from './services';
import { FileUploaderButton } from './FileUploaderBlock';
import { FilesUploadBaseComponent } from './FileUploaderBase';
import { BucketService } from '../bucket/bucket.service';
import { SvgModule } from '../Svg';
import { CollectionModule } from '../Collection';
import { BemModule } from 'angular-bem';

@NgModule({
      imports: [CommonModule, FormHelperModule, BootstrapHelperModule, SvgModule, CollectionModule, BemModule],
      exports: [FileUploaderButton, FilesUploadBaseComponent],
      declarations: [FileUploaderButton, FilesUploadBaseComponent],
      providers: [FileUploadService, FileFactoryService, FileKeyGenService, BucketService],
})
export class FIleUploaderModule {}
