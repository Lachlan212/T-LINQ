import type { Predicate } from '..';
import { where } from './intermediate/where';
import { Sequence } from './sequence';
import { count } from './terminal/count';
import { toArray } from './terminal/toArray';

declare module './sequence' {
    interface Sequence<T> {
        //intermediate
        where(predicate: Predicate<T>): Sequence<T>;

        //terminal
        toArray(): T[];
        count(predicate?: Predicate<T>): number;
    }
}

Sequence.prototype.where = function <T>(this: Sequence<T>, predicate: Predicate<T>): Sequence<T> {
    return where(this, predicate);
};

Sequence.prototype.toArray = function <T>(this: Sequence<T>): T[] {
    return toArray(this);
};

Sequence.prototype.count = function <T>(this: Sequence<T>, predicate?: Predicate<T>): number {
    return count(this, predicate);
};
