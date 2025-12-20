export type Predicate<T> = (item: T, index: number) => boolean;
export type Selector<TSource, TResult> = (item: TSource, index: number) => TResult;

export { Sequence } from './sequence/sequence';
export { from } from './sequence/sequence';

import './sequence/attach-operators';
