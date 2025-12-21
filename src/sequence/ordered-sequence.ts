import type { Comparer } from './comparer';
import { Sequence } from './sequence';

/**
 * Represents a sequence with an ordering applied.
 * Lazy: sorting happens upon enumeration.
 * Buffering: consumes entire source to sort.
 */
export class OrderedSequence<T> extends Sequence<T> {
    constructor(
        private readonly source: Iterable<T>,
        private readonly comparer: Comparer<T>,
    ) {
        //defer enumeration; run sorting at iteration time
        super(() => ({
            *[Symbol.iterator]() {
                const buffered: Array<{ value: T; index: number }> = [];
                let i = 0;

                for (const item of source) {
                    buffered.push({ value: item, index: i++ });
                }

                buffered.sort((a, b) => {
                    const c = comparer(a.value, b.value);
                    return c !== 0 ? c : a.index - b.index;
                });

                for (const item of buffered) {
                    yield item.value;
                }
            },
        }));
    }

    //allow chaining of thenBy/thenByDescending
    public createThenByComparer(next: Comparer<T>): Comparer<T> {
        const current = this.comparer;
        return (a, b) => {
            const c = current(a, b);
            return c !== 0 ? c : next(a, b);
        };
    }

    public getSource(): Iterable<T> {
        return this.source;
    }

    public getComparer(): Comparer<T> {
        return this.comparer;
    }
}
