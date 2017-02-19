export interface ICollection<T> {
  add( element: T ) : number;
  remove( element: T ) : number;
  removeWithIndex( index: number ) : number;
  replace( old: T, element: T ) : void;
  replaceWithIndex( index: number, element: T ) : void;
  isExist(element: T) : boolean;
}

