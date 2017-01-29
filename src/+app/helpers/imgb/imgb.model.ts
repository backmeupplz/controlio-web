export class ImageModel {
	private _name: string
	get name(){
		return this._name;
	}
	private _fileName: string
	get fileName(){
		return this._fileName;
	}
	public str: string;
	private _iskey: boolean = false;
	get iskey(){
		return this._iskey;
	}

	constructor(str: string, iskey?: boolean, name?: string, fileName?: string  ){
		if(!str){
			console.error("Error! ImageModel should be have str!");
		}
		this.str = str;
		this._iskey = iskey || false;
		if(fileName) this._fileName = fileName;
		if(name) this._name = name;
	}
}