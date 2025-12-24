import { describe, expect, it } from 'vitest';
import { from } from '../../src/index';

describe('thenBy()', () => {
    it('applies secondary sort after primary orderBy', () => {
        const source = [
            { first: 'John', last: 'Smith', age: 30 },
            { first: 'Alice', last: 'Johnson', age: 25 },
            { first: 'Bob', last: 'Smith', age: 35 },
            { first: 'Charlie', last: 'Johnson', age: 28 },
        ];

        const result = from(source)
            .orderBy((x) => x.last)
            .thenBy((x) => x.first)
            .toArray();

        expect(result).toEqual([
            { first: 'Alice', last: 'Johnson', age: 25 },
            { first: 'Charlie', last: 'Johnson', age: 28 },
            { first: 'Bob', last: 'Smith', age: 35 },
            { first: 'John', last: 'Smith', age: 30 },
        ]);
    });

    it('supports multiple thenBy calls', () => {
        const source = [
            { first: 'John', last: 'Smith', age: 30 },
            { first: 'Alice', last: 'Johnson', age: 25 },
            { first: 'Bob', last: 'Smith', age: 30 },
            { first: 'Alice', last: 'Johnson', age: 28 },
            { first: 'Bob', last: 'Smith', age: 25 },
        ];

        const result = from(source)
            .orderBy((x) => x.last)
            .thenBy((x) => x.first)
            .thenBy((x) => x.age)
            .toArray();

        expect(result).toEqual([
            { first: 'Alice', last: 'Johnson', age: 25 },
            { first: 'Alice', last: 'Johnson', age: 28 },
            { first: 'Bob', last: 'Smith', age: 25 },
            { first: 'Bob', last: 'Smith', age: 30 },
            { first: 'John', last: 'Smith', age: 30 },
        ]);
    });

    it('uses the provided comparer for secondary sorting', () => {
        const source = [
            { category: 'A', name: 'Banana' },
            { category: 'A', name: 'apple' },
            { category: 'B', name: 'date' },
            { category: 'B', name: 'Cherry' },
        ];

        const result = from(source)
            .orderBy((x) => x.category)
            .thenBy(
                (x) => x.name,
                (a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }),
            )
            .toArray();

        expect(result).toEqual([
            { category: 'A', name: 'apple' },
            { category: 'A', name: 'Banana' },
            { category: 'B', name: 'Cherry' },
            { category: 'B', name: 'date' },
        ]);
    });

    it('preserves stable sort when secondary keys are equal', () => {
        const source = [
            { id: 1, group: 'A', value: 10 },
            { id: 2, group: 'A', value: 10 },
            { id: 3, group: 'B', value: 20 },
            { id: 4, group: 'A', value: 10 },
            { id: 5, group: 'B', value: 20 },
        ];

        const result = from(source)
            .orderBy((x) => x.group)
            .thenBy((x) => x.value)
            .toArray();

        expect(result).toEqual([
            { id: 1, group: 'A', value: 10 },
            { id: 2, group: 'A', value: 10 },
            { id: 4, group: 'A', value: 10 },
            { id: 3, group: 'B', value: 20 },
            { id: 5, group: 'B', value: 20 },
        ]);
    });

    it('handles empty sequences', () => {
        const source: { a: number; b: string }[] = [];
        const result = from(source)
            .orderBy((x) => x.a)
            .thenBy((x) => x.b)
            .toArray();

        expect(result).toEqual([]);
    });

    it('handles sequences with one element', () => {
        const source = [{ a: 1, b: 'x' }];
        const result = from(source)
            .orderBy((x) => x.a)
            .thenBy((x) => x.b)
            .toArray();

        expect(result).toEqual([{ a: 1, b: 'x' }]);
    });

    it('handles all elements having same primary key', () => {
        const source = [
            { group: 'A', value: 3 },
            { group: 'A', value: 1 },
            { group: 'A', value: 2 },
        ];

        const result = from(source)
            .orderBy((x) => x.group)
            .thenBy((x) => x.value)
            .toArray();

        expect(result).toEqual([
            { group: 'A', value: 1 },
            { group: 'A', value: 2 },
            { group: 'A', value: 3 },
        ]);
    });

    it('does not iterate until needed', () => {
        let iterationCount = 0;
        const source = [
            { a: 2, b: 1 },
            { a: 1, b: 2 },
            { a: 2, b: 2 },
        ];

        const sequence = from(source)
            .orderBy((x) => {
                iterationCount++;
                return x.a;
            })
            .thenBy((x) => {
                iterationCount++;
                return x.b;
            });

        expect(iterationCount).toBe(0); // No iteration yet

        const result = sequence.toArray();
        expect(result).toEqual([
            { a: 1, b: 2 },
            { a: 2, b: 1 },
            { a: 2, b: 2 },
        ]);
    });

    it('works with numeric keys', () => {
        const source = [
            { x: 1, y: 3 },
            { x: 2, y: 1 },
            { x: 1, y: 2 },
            { x: 2, y: 2 },
        ];

        const result = from(source)
            .orderBy((x) => x.x)
            .thenBy((x) => x.y)
            .toArray();

        expect(result).toEqual([
            { x: 1, y: 2 },
            { x: 1, y: 3 },
            { x: 2, y: 1 },
            { x: 2, y: 2 },
        ]);
    });

    it('works with string keys', () => {
        const source = [
            { category: 'fruit', name: 'banana' },
            { category: 'vegetable', name: 'carrot' },
            { category: 'fruit', name: 'apple' },
            { category: 'vegetable', name: 'asparagus' },
        ];

        const result = from(source)
            .orderBy((x) => x.category)
            .thenBy((x) => x.name)
            .toArray();

        expect(result).toEqual([
            { category: 'fruit', name: 'apple' },
            { category: 'fruit', name: 'banana' },
            { category: 'vegetable', name: 'asparagus' },
            { category: 'vegetable', name: 'carrot' },
        ]);
    });

    it('handles when secondary keys can be null or undefined', () => {
        const source = [
            { id: 1, group: 'A', value: null },
            { id: 2, group: 'A', value: 10 },
            { id: 3, group: 'B', value: undefined },
            { id: 4, group: 'B', value: 5 },
        ];

        const result = from(source)
            .orderBy((x) => x.group)
            .thenBy((x) => x.value)
            .toArray();

        expect(result).toEqual([
            { id: 2, group: 'A', value: 10 },
            { id: 1, group: 'A', value: null },
            { id: 4, group: 'B', value: 5 },
            { id: 3, group: 'B', value: undefined },
        ]);
    });
});
