import { Grouping } from '@/grouping';

export class Lookup<TKey, TElement> implements Iterable<Grouping<TKey, TElement>> {
    private readonly map: Map<TKey, readonly TElement[]>;

    public constructor(map: Map<TKey, readonly TElement[]>) {
        this.map = map;
    }

    /** Number of keys in the lookup */
    public get size(): number {
        return this.map.size;
    }

    /** True if the lookup contains the key */
    public has(key: TKey): boolean {
        return this.map.has(key);
    }

    /**
     * Returns the elements for a key.
     * LINQ returns empty sequence for missing keys; we return an empty array.
     */
    public get(key: TKey): readonly TElement[] {
        return this.map.get(key) ?? [];
    }

    /** Enumerate groupings (key + iterable values) */
    public [Symbol.iterator](): Iterator<Grouping<TKey, TElement>> {
        const iter = this.map[Symbol.iterator]();
        return {
            next(): IteratorResult<Grouping<TKey, TElement>> {
                const n = iter.next();
                if (n.done) return { done: true, value: undefined as any };
                const [key, values] = n.value;
                return { done: false, value: new Grouping(key, values) };
            },
        };
    }

    /** Get the keys of the lookup */
    public keys(): IterableIterator<TKey> {
        return this.map.keys();
    }

    /** Get the values of the lookup */
    public values(): IterableIterator<readonly TElement[]> {
        return this.map.values();
    }

    /** Get the entries of the lookup */
    public entries(): IterableIterator<[TKey, readonly TElement[]]> {
        return this.map.entries();
    }
}
