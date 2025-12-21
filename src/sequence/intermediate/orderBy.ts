import type { KeySelector } from '../..';
import { defaultComparer, descending, type Comparer } from '../comparer';
import { OrderedSequence } from '../ordered-sequence';

//TODO: optimize by caching keys during buffering phase

export function orderBy<T, TKey>(
    source: Iterable<T>,
    keySelector: KeySelector<T, TKey>,
    keyComparer: Comparer<TKey> = defaultComparer as Comparer<TKey>,
): OrderedSequence<T> {
    const elementComparer: Comparer<T> = (a, b) => keyComparer(keySelector(a), keySelector(b));
    return new OrderedSequence(source, elementComparer);
}

export function orderByDescending<T, TKey>(
    source: Iterable<T>,
    keySelector: KeySelector<T, TKey>,
    keyComparer: Comparer<TKey> = defaultComparer as Comparer<TKey>,
): OrderedSequence<T> {
    const elementComparer: Comparer<T> = (a, b) => keyComparer(keySelector(a), keySelector(b));
    return new OrderedSequence(source, descending(elementComparer));
}
