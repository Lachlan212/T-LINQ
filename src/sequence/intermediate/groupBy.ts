import { type ElementSelector, type KeySelector, Sequence } from '../..';
import { Grouping } from '../grouping';

/**
 * Groups elements of a sequence according to a specified key selector function.
 * Lazy: grouping is performed on enumeration.
 * Buffering: consumes entire source to build the groups.
 *
 * Notes:
 * - Uses JS Map equality for keys:
 *   - primitives compare by value
 *   - objects compare by reference
 */
export function groupBy<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (item: TSource) => TKey,
): Sequence<Grouping<TKey, TSource>>;

export function groupBy<TSource, TKey, TElement>(
    source: Iterable<TSource>,
    keySelector: KeySelector<TSource, TKey>,
    elementSelector: ElementSelector<TSource, TElement>,
): Sequence<Grouping<TKey, TElement>>;

export function groupBy<TSource, TKey, TElement>(
    source: Iterable<TSource>,
    keySelector: KeySelector<TSource, TKey>,
    elementSelector?: ElementSelector<TSource, TElement>,
): Sequence<Grouping<TKey, TSource | TElement>> {
    return Sequence.defer(function* () {
        // Map preserves insertion order of keys
        const map = new Map<TKey, Array<TSource | TElement>>();

        for (const item of source) {
            const key = keySelector(item);
            const element = elementSelector ? elementSelector(item) : item;

            let bucket = map.get(key);

            if (!bucket) {
                bucket = [];
                map.set(key, bucket);
            }

            bucket.push(element);
        }

        for (const [key, values] of map) {
            yield new Grouping(key, values);
        }
    });
}
