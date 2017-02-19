export abstract class AbstractFile {
  protected _file: any;
  protected _key: string;
  get key(){
    return this._key;
  }
}
