import type { Predicate } from '../..';

export function single<T>(source: Iterable<T>, predicate?: Predicate<T>): T {
    let i = 0;
    let found: T | undefined = undefined;
    if (!predicate) {
        for (const item of source) {
            if (found !== undefined) {
                throw new Error('The source sequence contains more than one element.');
            }
            found = item;
        }
        if (found === undefined) {
            throw new Error('The source sequence is empty.');
        }
        return found;
    }

    for (const item of source) {
        if (predicate(item, i++)) {
            if (found !== undefined) {
                throw new Error('More than one element satisfies the condition.');
            }
            found = item;
        }
    }
    if (found === undefined) {
        throw new Error('No element satisfies the condition.');
    }
    return found;
}

export function singleOrDefault<T>(source: Iterable<T>, predicate?: Predicate<T>): T | undefined {
    let i = 0;
    let found: T | undefined = undefined;
    if (!predicate) {
        for (const item of source) {
            if (found !== undefined) {
                throw new Error('The source sequence contains more than one element.');
            }
            found = item;
        }
        return found;
    }

    for (const item of source) {
        if (predicate(item, i++)) {
            if (found !== undefined) {
                throw new Error('More than one element satisfies the condition.');
            }
            found = item;
        }
    }
    return found;
}
