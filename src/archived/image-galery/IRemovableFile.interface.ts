import { FileModel } from '../form-elements/File.model';
export interface IRemovableFile {
	removeFile(image: FileModel): void;
}
