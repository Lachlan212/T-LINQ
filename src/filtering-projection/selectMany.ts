import { Sequence } from '@/sequence';

export type CollectionSelector<TSource, TCollection> = (
    item: TSource,
    index: number,
) => Iterable<TCollection>;

export type ResultSelector<TSource, TCollection, TResult> = (
    sourceItem: TSource,
    collectionItem: TCollection,
) => TResult;

export function selectMany<TSource, TCollection>(
    source: Iterable<TSource>,
    collectionSelector: CollectionSelector<TSource, TCollection>,
): Sequence<TCollection>;

export function selectMany<TSource, TCollection, TResult>(
    source: Iterable<TSource>,
    collectionSelector: CollectionSelector<TSource, TCollection>,
    resultSelector: ResultSelector<TSource, TCollection, TResult>,
): Sequence<TResult>;

export function selectMany<TSource, TCollection, TResult>(
    source: Iterable<TSource>,
    collectionSelector: CollectionSelector<TSource, TCollection>,
    resultSelector?: ResultSelector<TSource, TCollection, TResult>,
) {
    return Sequence.defer(function* () {
        let i = 0;

        for (const outer of source) {
            const innerIterable = collectionSelector(outer, i++);

            //Fail fast
            if (innerIterable == null) {
                throw new Error(
                    'Sequence.selectMany(): collectionSelector returned null or undefined',
                );
            }

            for (const inner of innerIterable) {
                yield resultSelector ? resultSelector(outer, inner) : inner;
            }
        }
    });
}
