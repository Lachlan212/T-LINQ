import type { Predicate } from '../..';

export function count<T>(source: Iterable<T>, predicate?: Predicate<T>): number {
    let i = 0;
    let result = 0;

    if (!predicate) {
        for (const _ of source) {
            result++;
        }
        return result;
    }

    for (const item of source) {
        if (predicate(item, i)) {
            result++;
        }
        i++;
    }

    return result;
}
