import type { ElementSelector } from '@/index';

// Overload: no selector, T must be number or nullable
export function sum(source: Iterable<number | null | undefined>): number;
// Overload: with selector, T can be any type
export function sum<T>(
    source: Iterable<T>,
    selector: ElementSelector<T, number | null | undefined>,
): number;
// Implementation
export function sum<T>(
    source: Iterable<T>,
    selector?: ElementSelector<T, number | null | undefined>,
): number {
    let total = 0;

    for (const item of source) {
        const value = selector ? selector(item) : (item as number | null | undefined);
        if (value == null) continue;
        total += value;
    }

    return total;
}
