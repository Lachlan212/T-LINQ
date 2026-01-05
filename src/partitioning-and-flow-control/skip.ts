import { Sequence } from '@/index';

/**
 * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
 * @param source The sequence to return elements from.
 * @param count The number of elements to skip before returning the remaining elements.
 * @returns A Sequence<T> that contains the elements that occur after the specified index in the input sequence.
 */
export function skip<T>(source: Iterable<T>, count: number): Sequence<T> {
    return Sequence.defer(function* () {
        if (count <= 0) {
            yield* source;
            return;
        }

        let remaining = count;
        for (const item of source) {
            if (remaining > 0) {
                remaining--;
            } else {
                yield item;
            }
        }
    });
}
