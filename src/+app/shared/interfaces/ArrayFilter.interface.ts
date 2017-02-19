export interface ArrayFilter<T> {
  filterType<U extends T>(pred: (a: T) => a is U): U[];
}
