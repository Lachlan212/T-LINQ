export type Comparer<T> = (a: T, b: T) => number;

export function defaultComparer(a: unknown, b: unknown): number {
    if (a === b) return 0;
    if (a == null) return 1;
    if (b == null) return -1;

    return a < b ? -1 : 1;
}

export function descending<T>(comparer: Comparer<T>): Comparer<T> {
    return (a: T, b: T) => comparer(b, a);
}
