import type { ElementSelector, KeySelector } from '@/index';
import { Lookup } from '@/lookup';

export function toLookup<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: KeySelector<TSource, TKey>,
): Lookup<TKey, TSource>;

export function toLookup<TSource, TKey, TElement>(
    source: Iterable<TSource>,
    keySelector: KeySelector<TSource, TKey>,
    elementSelector: ElementSelector<TSource, TElement>,
): Lookup<TKey, TElement>;

export function toLookup<TSource, TKey, TElement>(
    source: Iterable<TSource>,
    keySelector: KeySelector<TSource, TKey>,
    elementSelector?: ElementSelector<TSource, TElement>,
): Lookup<TKey, TSource | TElement> {
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

    //Freeze buckets to discourage mutation from outside
    const readonlyMap = new Map<TKey, ReadonlyArray<TSource | TElement>>();
    for (const [key, values] of map) {
        readonlyMap.set(key, Object.freeze(values.slice()));
    }

    return new Lookup(readonlyMap);
}
