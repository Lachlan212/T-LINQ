export class Sequence<T> implements Iterable<T> {
    private readonly _getIterable: () => Iterable<T>;

    /**
     * The core design choice:
     * Store a *factory* that can produce a fresh Iterable each time.
     * This makes the Sequence re-iterable even when built from generators.
     */
    constructor(getIterable: () => Iterable<T>) {
        this._getIterable = getIterable;
    }

    static from<T>(source: Iterable<T>): Sequence<T> {
        return new Sequence(() => source);
    }

    static defer<T>(factory: () => Iterable<T>): Sequence<T> {
        return new Sequence(factory);
    }

    public [Symbol.iterator](): Iterator<T> {
        return this._getIterable()[Symbol.iterator]();
    }
}

export function from<T>(source: Iterable<T>): Sequence<T> {
    return Sequence.from(source);
}
