import type { Predicate } from '../..';
import { Sequence } from '../sequence';

/**
 * Filters a sequence of values based on a predicate
 * @param source an Iterable<T> to filter.
 * @param predicate a function to test each element for a condition.
 * @returns A Sequence<T> that contains elements from the input sequence that satisfy the condition.
 */
export function where<T>(source: Iterable<T>, predicate: Predicate<T>): Sequence<T> {
    return Sequence.defer(function* () {
        let i = 0;
        for (const item of source) {
            if (predicate(item, i++)) yield item;
        }
    });
}
