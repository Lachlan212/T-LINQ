import { from } from '@/index';
import { describe, expect, it } from 'vitest';

describe('thenByDescending()', () => {
    it('applies secondary descending sort after primary orderBy', () => {
        const source = [
            { first: 'John', last: 'Smith', age: 30 },
            { first: 'Alice', last: 'Johnson', age: 25 },
            { first: 'Bob', last: 'Smith', age: 35 },
            { first: 'Charlie', last: 'Johnson', age: 28 },
        ];

        const result = from(source)
            .orderBy((x) => x.last)
            .thenByDescending((x) => x.first)
            .toArray();

        expect(result).toEqual([
            { first: 'Charlie', last: 'Johnson', age: 28 },
            { first: 'Alice', last: 'Johnson', age: 25 },
            { first: 'John', last: 'Smith', age: 30 },
            { first: 'Bob', last: 'Smith', age: 35 },
        ]);
    });

    it('mixes thenBy and thenByDescending', () => {
        const source = [
            { dept: 'Sales', name: 'John', salary: 50000 },
            { dept: 'Sales', name: 'Alice', salary: 60000 },
            { dept: 'IT', name: 'Bob', salary: 70000 },
            { dept: 'IT', name: 'Charlie', salary: 70000 },
            { dept: 'Sales', name: 'Diana', salary: 60000 },
        ];

        const result = from(source)
            .orderBy((x) => x.dept)
            .thenByDescending((x) => x.salary)
            .thenBy((x) => x.name)
            .toArray();

        expect(result).toEqual([
            { dept: 'IT', name: 'Bob', salary: 70000 },
            { dept: 'IT', name: 'Charlie', salary: 70000 },
            { dept: 'Sales', name: 'Alice', salary: 60000 },
            { dept: 'Sales', name: 'Diana', salary: 60000 },
            { dept: 'Sales', name: 'John', salary: 50000 },
        ]);
    });

    it('uses the provided comparer for descending secondary sorting', () => {
        const source = [
            { category: 'A', name: 'apple' },
            { category: 'A', name: 'Banana' },
            { category: 'B', name: 'Cherry' },
            { category: 'B', name: 'date' },
        ];

        const result = from(source)
            .orderBy((x) => x.category)
            .thenByDescending(
                (x) => x.name,
                (a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }),
            )
            .toArray();

        expect(result).toEqual([
            { category: 'A', name: 'Banana' },
            { category: 'A', name: 'apple' },
            { category: 'B', name: 'date' },
            { category: 'B', name: 'Cherry' },
        ]);
    });

    it('works after orderByDescending', () => {
        const source = [
            { priority: 1, task: 'Z' },
            { priority: 2, task: 'A' },
            { priority: 1, task: 'A' },
            { priority: 2, task: 'Z' },
        ];

        const result = from(source)
            .orderByDescending((x) => x.priority)
            .thenBy((x) => x.task)
            .toArray();

        expect(result).toEqual([
            { priority: 2, task: 'A' },
            { priority: 2, task: 'Z' },
            { priority: 1, task: 'A' },
            { priority: 1, task: 'Z' },
        ]);
    });

    it('handles numeric keys in descending order', () => {
        const source = [
            { x: 1, y: 3 },
            { x: 2, y: 1 },
            { x: 1, y: 2 },
            { x: 2, y: 2 },
        ];

        const result = from(source)
            .orderBy((x) => x.x)
            .thenByDescending((x) => x.y)
            .toArray();

        expect(result).toEqual([
            { x: 1, y: 3 },
            { x: 1, y: 2 },
            { x: 2, y: 2 },
            { x: 2, y: 1 },
        ]);
    });

    it('preserves stable sort when descending secondary keys are equal', () => {
        const source = [
            { id: 1, group: 'A', value: 10 },
            { id: 2, group: 'A', value: 10 },
            { id: 3, group: 'B', value: 10 },
            { id: 4, group: 'A', value: 10 },
        ];

        const result = from(source)
            .orderBy((x) => x.group)
            .thenByDescending((x) => x.value)
            .toArray();

        expect(result).toEqual([
            { id: 1, group: 'A', value: 10 },
            { id: 2, group: 'A', value: 10 },
            { id: 4, group: 'A', value: 10 },
            { id: 3, group: 'B', value: 10 },
        ]);
    });
});
