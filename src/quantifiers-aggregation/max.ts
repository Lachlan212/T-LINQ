import type { ElementSelector } from '@/index';

export function max(source: Iterable<number | null | undefined>): number | undefined;

export function max<T>(
    source: Iterable<T>,
    selector: ElementSelector<T, number | null | undefined>,
): number | undefined;

export function max<T>(
    source: Iterable<T>,
    selector?: ElementSelector<T, number | null | undefined>,
): number | undefined {
    let maxValue: number | undefined = undefined;

    for (const item of source) {
        const value = selector ? selector(item) : (item as unknown as number);

        if (value == null) {
            continue;
        }

        if (maxValue === undefined || value > maxValue) {
            maxValue = value;
        }
    }

    return maxValue;
}
