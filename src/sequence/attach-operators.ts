import type { ElementSelector, KeySelector, Predicate, Selector } from '..';
import type { Comparer } from './comparer';
import type { OrderedSequence } from './ordered-sequence';
import { orderBy, orderByDescending } from './intermediate/orderBy';
import select from './intermediate/select';
import { where } from './intermediate/where';
import { Sequence } from './sequence';
import { count } from './terminal/count';
import { first, firstOrDefault } from './terminal/first';
import { toArray } from './terminal/toArray';
import { toSet } from './terminal/toSet';
import { single, singleOrDefault } from './terminal/single';
import type { Grouping } from './grouping';
import { groupBy } from './intermediate/groupBy';
import type { Lookup } from './lookup';
import { toLookup } from './terminal/toLookup';

declare module './sequence' {
    interface Sequence<T> {
        //intermediate
        /**
         * Filters a sequence of values based on a predicate
         * @param predicate a function to test each element for a condition.
         */
        where(predicate: Predicate<T>): Sequence<T>;
        select<TResult>(selector: (item: T, index: number) => TResult): Sequence<TResult>;
        orderBy<TKey>(
            keySelector: KeySelector<T, TKey>,
            keyComparer?: Comparer<TKey>,
        ): OrderedSequence<T>;

        orderByDescending<TKey>(
            keySelector: KeySelector<T, TKey>,
            keyComparer?: Comparer<TKey>,
        ): OrderedSequence<T>;

        groupBy<TKey>(keySelector: KeySelector<T, TKey>): Sequence<Grouping<TKey, T>>;
        groupBy<TKey, TElement>(
            keySelector: KeySelector<T, TKey>,
            elementSelector: ElementSelector<T, TElement>,
        ): Sequence<Grouping<TKey, TElement>>;

        //terminal
        toArray(): T[];
        toSet(): Set<T>;
        count(predicate?: Predicate<T>): number;

        toLookup<TKey>(keySelector: KeySelector<T, TKey>): Lookup<TKey, T>;
        toLookup<TKey, TElement>(
            keySelector: KeySelector<T, TKey>,
            elementSelector: ElementSelector<T, TElement>,
        ): Lookup<TKey, TElement>;

        first(predicate?: Predicate<T>): T;
        firstOrDefault(predicate?: Predicate<T>): T | undefined;
        single(predicate?: Predicate<T>): T;
        singleOrDefault(predicate?: Predicate<T>): T | undefined;
    }
}

Sequence.prototype.where = function <T>(this: Sequence<T>, predicate: Predicate<T>): Sequence<T> {
    return where(this, predicate);
};

Sequence.prototype.toArray = function <T>(this: Sequence<T>): T[] {
    return toArray(this);
};

Sequence.prototype.toSet = function <T>(this: Sequence<T>): Set<T> {
    return toSet(this);
};

Sequence.prototype.count = function <T>(this: Sequence<T>, predicate?: Predicate<T>): number {
    return count(this, predicate);
};

Sequence.prototype.select = function <T, TResult>(
    this: Sequence<T>,
    selector: Selector<T, TResult>,
): Sequence<TResult> {
    return select(this, selector);
};

Sequence.prototype.orderBy = function <T, TKey>(
    this: Sequence<T>,
    keySelector: KeySelector<T, TKey>,
    keyComparer?: Comparer<TKey>,
): OrderedSequence<T> {
    return orderBy(this, keySelector, keyComparer);
};

Sequence.prototype.orderByDescending = function <T, TKey>(
    this: Sequence<T>,
    keySelector: KeySelector<T, TKey>,
    keyComparer?: Comparer<TKey>,
): OrderedSequence<T> {
    return orderByDescending(this, keySelector, keyComparer);
};

Sequence.prototype.first = function <T>(this: Sequence<T>, predicate?: Predicate<T>): T {
    return first(this, predicate);
};

Sequence.prototype.firstOrDefault = function <T>(
    this: Sequence<T>,
    predicate?: Predicate<T>,
): T | undefined {
    return firstOrDefault(this, predicate);
};

Sequence.prototype.single = function <T>(this: Sequence<T>, predicate?: Predicate<T>): T {
    return single(this, predicate);
};

Sequence.prototype.singleOrDefault = function <T>(
    this: Sequence<T>,
    predicate?: Predicate<T>,
): T | undefined {
    return singleOrDefault(this, predicate);
};

Sequence.prototype.groupBy = function <T, TKey, TElement>(
    this: Sequence<T>,
    keySelector: KeySelector<T, TKey>,
    elementSelector?: ElementSelector<T, TElement>,
) {
    return groupBy(this, keySelector, elementSelector as any);
};

Sequence.prototype.toLookup = function <T, TKey, TElement>(
    this: Sequence<T>,
    keySelector: KeySelector<T, TKey>,
    elementSelector?: ElementSelector<T, TElement>,
): Lookup<TKey, T | TElement> {
    return toLookup(this, keySelector, elementSelector as any);
};
