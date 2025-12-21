import type { Predicate } from '../..';

export function first<T>(source: Iterable<T>, predicate?: Predicate<T>): T {
    let i = 0;

    if (!predicate) {
        for (const item of source) {
            return item;
        }
        throw new Error('The source sequence is empty.');
    }

    for (const item of source) {
        if (predicate(item, i++)) {
            return item;
        }
    }
    throw new Error('No element satisfies the condition.');
}

export function firstOrDefault<T>(source: Iterable<T>, predicate?: Predicate<T>): T | undefined {
    let i = 0;

    if (!predicate) {
        for (const item of source) {
            return item;
        }
        return undefined;
    }

    for (const item of source) {
        if (predicate(item, i++)) {
            return item;
        }
    }
    return undefined;
}
