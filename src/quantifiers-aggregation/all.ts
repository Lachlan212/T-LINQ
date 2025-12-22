import type { Predicate } from '@/index';

export default function all<T>(source: Iterable<T>, predicate: Predicate<T>): boolean {
    let index = 0;

    for (const item of source) {
        if (!predicate(item, index++)) {
            return false;
        }
    }

    return true;
}
