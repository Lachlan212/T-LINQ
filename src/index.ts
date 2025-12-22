export type Predicate<T> = (item: T, index: number) => boolean;
export type Selector<TSource, TResult> = (item: TSource, index: number) => TResult;
export type KeySelector<TSource, TKey> = (item: TSource) => TKey;
export type ElementSelector<TSource, TResult> = (item: TSource) => TResult;
export type Nullable<T> = T | null | undefined;

export { Sequence } from '@/sequence';
export { from } from '@/sequence';

// Import to attach operators to Sequence prototype
import '@/attach-operators';
