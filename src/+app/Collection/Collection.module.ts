import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionComponent }   from './components/Collection.component';
import { ImageModule } from '../Image';
import { FIleModule } from '../FileView';
import { FullPageSliderService } from '../ImageGallery/services';
import { GalleryModule } from '../ImageGallery';
@NgModule({
      imports: [CommonModule, ImageModule, FIleModule, GalleryModule],
      exports: [CollectionComponent],
      declarations: [CollectionComponent],
      providers: [],
})
export class CollectionModule {}

