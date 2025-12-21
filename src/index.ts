export type Predicate<T> = (item: T, index: number) => boolean;
export type Selector<TSource, TResult> = (item: TSource, index: number) => TResult;
export type KeySelector<TSource, TKey> = (item: TSource) => TKey;
export type ElementSelector<TSource, TResult> = (item: TSource) => TResult;

export { Sequence } from './sequence/sequence';
export { from } from './sequence/sequence';

import './sequence/attach-operators';
