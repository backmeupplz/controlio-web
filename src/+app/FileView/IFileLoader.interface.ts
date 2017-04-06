import { FileModel, AbstractFile } from '../Files';
import { Observable } from 'rxjs/Observable';

export interface IFileLoader {
  loadFile(key: string) : Observable<AbstractFile>;
}
