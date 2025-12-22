import type { Predicate } from '@/index';

export default function any<T>(source: Iterable<T>, predicate?: Predicate<T>) {
    let i = 0;

    for (const item of source) {
        if (!predicate || predicate(item, i++)) {
            return true;
        }
    }

    return false;
}
