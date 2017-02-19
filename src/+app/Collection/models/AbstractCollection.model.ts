import { ICollection } from '../interfaces';

export abstract class AbstractCollection<T> extends Array<T> implements ICollection<T> {
  add( element: T ) : number {
    this.push(element);
    return this.length;
  }
  remove( element: T ) : number {
    if(this.isExist( element )){
      return this.removeWithIndex( this.indexOf(element) );
    }
    return this.length;
  }
  removeWithIndex( index: number ) : number {
    if( index >= 0 && index <= this.length ){
      this.splice(index, 1);
    }
    return this.length;
  }
  replace( old: T, element: T ) : void {
    let index = this.indexOf(old);
    if( index >= 0 && index <= this.length ){
      this[index] = element;
    }
  }
  replaceWithIndex( index: number, element: T ) : void {
    if( index >= 0 && index <= this.length ){
      this[index] = element;
    }
  }
  isExist(element: T) : boolean {
    return this.indexOf(element) >= 0 ? true : false;
  }
}
