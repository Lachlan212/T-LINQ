import type { ElementSelector } from '@/index';

export function average(source: Iterable<number | null | undefined>): number;

export function average<T>(
    source: Iterable<T>,
    selector: ElementSelector<T, number | null | undefined>,
): number;

export function average<T>(
    source: Iterable<T>,
    selector?: ElementSelector<T, number | null | undefined>,
): number {
    let total = 0;
    let count = 0;

    for (const item of source) {
        const value = selector ? selector(item) : (item as number | null | undefined);
        if (value == null) continue;
        count++;
        total += value;
    }

    return count === 0 ? 0 : total / count;
}
