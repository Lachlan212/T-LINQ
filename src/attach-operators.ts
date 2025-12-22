import type { Comparer } from '@/comparer';
import { first, firstOrDefault } from '@/element-operators/first';
import { single, singleOrDefault } from '@/element-operators/single';
import select from '@/filtering-projection/select';
import {
    selectMany,
    type CollectionSelector,
    type ResultSelector,
} from '@/filtering-projection/selectMany';
import { where } from '@/filtering-projection/where';
import { Grouping } from '@/grouping';
import { groupBy } from '@/grouping/groupBy';
import {
    Sequence,
    type ElementSelector,
    type KeySelector,
    type Nullable,
    type Predicate,
    type Selector,
} from '@/index';
import type { Lookup } from '@/lookup';
import { toArray } from '@/materialization-conversion/toArray';
import { toLookup } from '@/materialization-conversion/toLookup';
import { toSet } from '@/materialization-conversion/toSet';
import type { OrderedSequence } from '@/ordered-sequence';
import { orderBy, orderByDescending } from '@/ordering/orderBy';
import all from '@/quantifiers-aggregation/all';
import any from '@/quantifiers-aggregation/any';
import { average } from '@/quantifiers-aggregation/average';
import { count } from '@/quantifiers-aggregation/count';
import { min } from '@/quantifiers-aggregation/min';
import { sum } from '@/quantifiers-aggregation/sum';

declare module './sequence' {
    interface Sequence<T> {
        //intermediate
        /**
         * Filters a sequence of values based on a predicate
         * @param predicate a function to test each element for a condition.
         */
        where(predicate: Predicate<T>): Sequence<T>;
        select<TResult>(selector: (item: T, index: number) => TResult): Sequence<TResult>;
        selectMany<TCollection>(
            collectionSelector: CollectionSelector<T, TCollection>,
        ): Sequence<TCollection>;

        selectMany<TCollection, TResult>(
            collectionSelector: CollectionSelector<T, TCollection>,
            resultSelector: ResultSelector<T, TCollection, TResult>,
        ): Sequence<TResult>;

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
        any(predicate?: Predicate<T>): boolean;
        all(predicate: Predicate<T>): boolean;
        sum<TNum extends number | null | undefined>(this: Sequence<TNum>): number;
        sum(selector: ElementSelector<T, number | null | undefined>): number;
        average<TNum extends number | null | undefined>(this: Sequence<TNum>): number;
        average(selector: ElementSelector<T, number | null | undefined>): number;
        min<TNum extends number | null | undefined>(this: Sequence<TNum>): number | undefined;
        min(selector: ElementSelector<T, number | null | undefined>): number | undefined;

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

Sequence.prototype.selectMany = function <T, TCollection, TResult>(
    this: Sequence<T>,
    collectionSelector: CollectionSelector<T, TCollection>,
    resultSelector?: ResultSelector<T, TCollection, TResult>,
): Sequence<TCollection | TResult> {
    return selectMany(this, collectionSelector, resultSelector as any);
};

Sequence.prototype.any = function <T>(this: Sequence<T>, predicate?: Predicate<T>): boolean {
    return any(this, predicate);
};

Sequence.prototype.all = function <T>(this: Sequence<T>, predicate: Predicate<T>): boolean {
    return all(this, predicate);
};

Sequence.prototype.sum = function <T>(
    this: Sequence<T>,
    selector?: ElementSelector<T, Nullable<number>>,
): number {
    return sum(this, selector as any);
};

Sequence.prototype.average = function <T>(
    this: Sequence<T>,
    selector?: ElementSelector<T, Nullable<number>>,
): number {
    return average(this, selector as any);
};

//TODO: Remove any's from here
Sequence.prototype.min = function <T>(
    this: Sequence<T>,
    selector?: ElementSelector<T, Nullable<number>>,
): T | undefined {
    return min(this, selector as any);
};
