import { FileModel, AFile } from '../FileUploader/models';
import { Observable } from 'rxjs/Observable';

export interface IFileLoader {
  loadFile(key: string) : Observable<AFile>;
}
