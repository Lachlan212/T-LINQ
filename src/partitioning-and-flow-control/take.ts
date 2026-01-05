import { Sequence } from '@/index';

/**
 * Returns a specified number of contiguous elements from the start of a sequence.
 * @param source The sequence to return elements from.
 * @param count The number of elements to return.
 * @returns A Sequence<T> that contains the specified number of elements from the start of the input sequence.
 */
export function take<T>(source: Iterable<T>, count: number): Sequence<T> {
    return Sequence.defer(function* () {
        if (count <= 0) return;

        let remaining = count;
        for (const item of source) {
            if (remaining-- <= 0) break;
            yield item;
        }
    });
}
