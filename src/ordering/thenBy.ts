import { defaultComparer, descending, type Comparer } from '@/comparer';
import type { KeySelector } from '@/index';
import { OrderedSequence } from '@/ordered-sequence';

export function thenBy<T, TKey>(
    source: OrderedSequence<T>,
    keySelector: KeySelector<T, TKey>,
    keyComparer: Comparer<TKey> = defaultComparer as Comparer<TKey>,
): OrderedSequence<T> {
    const elementComparer: Comparer<T> = (a, b) => keyComparer(keySelector(a), keySelector(b));
    const chainedComparer = source.createThenByComparer(elementComparer);
    return new OrderedSequence(source.getSource(), chainedComparer);
}

export function thenByDescending<T, TKey>(
    source: OrderedSequence<T>,
    keySelector: KeySelector<T, TKey>,
    keyComparer: Comparer<TKey> = defaultComparer as Comparer<TKey>,
): OrderedSequence<T> {
    const elementComparer: Comparer<T> = (a, b) => keyComparer(keySelector(a), keySelector(b));
    const chainedComparer = source.createThenByComparer(descending(elementComparer));
    return new OrderedSequence(source.getSource(), chainedComparer);
}
