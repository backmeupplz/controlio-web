import { IRemovableFile } from './IRemovableFile.interface';
import { FileModel } from '../form-elements/File.model';

export class FilesGalleryModel {
	public index: number = 1;
  private _files: FileModel[] = [];
 	get files(){
 		return this._files;
 	}
  set files(files: FileModel[]){
    this._files = files;
  }
 	setOnefile(file: FileModel){
 		this._files = [file];
 	}


 	private instance: any;
	constructor(files?: FileModel[], instance?: IRemovableFile ){
		if(files) this._files = files;
		if(instance) this.instance = instance;
	}

	addfile(file: FileModel){
		if(file) this._files.push(file);
	}


  findfileFromStr(key: string){
    let index = -1;
    for(let i=0;i<this._files.length;i++){
      if(this._files[i].key == key){
        index = i;
        break;
      }
    }
    return index > -1 ? this._files[index] : null;
  };

	removefileFromStr(key: string){
		let index = -1;
		for(let i=0;i<this._files.length;i++){
			if(this._files[i].key == key){
				index = i;
				break;
			}
		}
		if(index >= 0 ) {
			let file = this.files.splice(index, 1)[0];
			if(this.instance){
  			if( this.removefileFromInstance(this.instance)){
  				this.instance.removeFile(file);
  			} else {
  				console.error("This object ", this.instance, " should be has removefile method!");
  			}
      }
		}
	}

	removefile(file: FileModel){
    console.log(file);
		this.removefileFromStr(file.key);
	}

	removefileFromInstance(arg: any): arg is IRemovableFile {
  	return (arg as IRemovableFile).removeFile !== undefined;
 	}
}
