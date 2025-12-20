import type { Predicate } from '../..';
import { Sequence } from '../sequence';

export function where<T>(source: Iterable<T>, predicate: Predicate<T>): Sequence<T> {
    return Sequence.defer(function* () {
        let i = 0;
        for (const item of source) {
            if (predicate(item, i++)) yield item;
        }
    });
}
