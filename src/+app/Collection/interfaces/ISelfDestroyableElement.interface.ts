import { ICollection } from './ICollection.interface';

export interface ISelfDestroyableElement<T> {
  collection: ICollection<T>;
  destroy() : boolean;
}
