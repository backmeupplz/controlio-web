import { FileModel, FileImageModel } from '../../Files/models';
//import { ArrayFilter } from '../../shared';
import { IFile } from '../../Files/interfaces';
import { AbstractCollection } from './AbstractCollection.model';


//implements ArrayFilter<T>
export class FileCollection<T extends FileModel> extends AbstractCollection<T> {
  // filterType<FileImageModel>() : T[] {
  //   return this.filter((elem)=>{
  //     if( elem instanceof FileImageModel ){
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   })
  // }
}

