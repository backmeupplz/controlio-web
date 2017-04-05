import { NgModule, ModuleWithProviders } from '@angular/core';
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
import { FileUploadButton } from './FileUploaderButton'

@NgModule({
  imports: [],
  exports: [],
  declarations: []
})
export class FileUploaderServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FileUploaderServicesModule,
      providers: [FileUploadService, FileFactoryService, FileKeyGenService, BucketService]
    }
  }
}

@NgModule({
  imports: [CommonModule, FormHelperModule, BootstrapHelperModule, SvgModule, CollectionModule, BemModule, FileUploaderServicesModule],
  exports: [FileUploaderButton, FilesUploadBaseComponent, FileUploadButton],
  declarations: [FileUploaderButton, FilesUploadBaseComponent, FileUploadButton]
})
export class FIleUploaderModule {}
