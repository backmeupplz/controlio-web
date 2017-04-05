import { FileModel, FileImageModel } from '../../Files/models';
import { ArrayFilter } from '../../shared';
import { IFile } from '../../Files/interfaces';
import { AbstractCollection } from './AbstractCollection.model';

export class FileCollection<T extends FileModel> extends AbstractCollection<T> implements ArrayFilter<T> {
  filterType<FileImageModel>() : FileImageModel[] {
    let arr = [];
    for(let file of this){
      if( file instanceof FileImageModel ){
        arr.push(file)
      }
    }
    return arr
  }
  constructor(){
     super()
  }
}

