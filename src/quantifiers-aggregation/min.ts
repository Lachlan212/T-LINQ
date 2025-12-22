import type { ElementSelector } from '@/index';

export function min(source: Iterable<number | null | undefined>): number | undefined;

export function min<T>(
    source: Iterable<T>,
    selector: ElementSelector<T, number | null | undefined>,
): number | undefined;

export function min<T>(
    source: Iterable<T>,
    selector?: ElementSelector<T, number | null | undefined>,
): number | undefined {
    let minValue: number | undefined = undefined;

    for (const item of source) {
        const value = selector ? selector(item) : (item as unknown as number);

        if (value == null) {
            continue;
        }

        if (minValue === undefined || value < minValue) {
            minValue = value;
        }
    }

    return minValue;
}
