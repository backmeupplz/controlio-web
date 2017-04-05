import { AbstractFile } from './AbstractFile.model';
export class FileModel extends AbstractFile {

	protected _file: any;
	get file(){
		return this._file;
	}

  get type(){
    let str = this._name || this._key;
    return str.split('.').pop()
  }

  get shortName(){
    let str = this._name || this._key;
    let res = str.match(/[\w,\s-]+\.[A-Za-z]{3}$/) || str;
    return res;
  }

  public clone(): any {
    return new FileModel(this.key, this.file, this.isUploaded, this.name);
  }

	protected _key: string;
	get key(){
		return this._key;
	}

  protected _name: string;
  get name(){
    return this._name;
  }


  public callbackAfter: any =  function(){};
  protected _isUploaded: boolean = false;
  get isUploaded(){
    return this._isUploaded;
  }
  public loadFile: any = (err, res)=>{
    if(!err) this._isUploaded = true;
    this._isLoad = false;
    this.callbackAfter(err, res);
  };


  protected _isLoad: boolean = false;
  get isLoad(){
    return this._isLoad;
  }
  setLoad(){
    this._isLoad = true;
  }


  public callbackProgress: any = function(err, res){};
  private _progress: number = 0;
  set progress(progress: number){
    this._progress = progress >= 0 ? progress : 0;
  }
  get progress(){
    return this._progress;
  }
  public loadFileProgress: any = (progress: number)=>{
    this._isLoad = true;
    this._progress = progress;
    this.callbackProgress(progress);
  };

  onFileProgress(_callbackAfter?: any, _callbackProgress?: any){
    if( _callbackAfter ) this.callbackAfter = _callbackAfter;
    if( _callbackProgress ) this.callbackProgress = _callbackProgress;
  }

	constructor(key: string, file: any, isUploaded?: boolean, name?: string){
    super();
		this._key = key;
		this._file = file;
    this._isUploaded = (isUploaded != null) ? isUploaded : false;
    if(name) this._name = name;
	}
}
