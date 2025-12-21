export class Grouping<TKey, TElement> implements Iterable<TElement> {
    public constructor(
        public readonly key: TKey,
        private readonly values: readonly TElement[],
    ) {}

    public [Symbol.iterator](): Iterator<TElement> {
        return this.values[Symbol.iterator]();
    }
}
