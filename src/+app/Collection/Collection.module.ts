import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionComponent }   from './components/Collection.component';

@NgModule({
      imports: [CommonModule],
      exports: [CollectionComponent],
      declarations: [CollectionComponent],
      providers: [],
})
export class CollectionModule {}

