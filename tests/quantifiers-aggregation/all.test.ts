import { from } from '@/index';
import { describe, expect, it } from 'vitest';

describe('all()', () => {
    it('returns true when all elements satisfy the predicate', () => {
        const source = [2, 4, 6, 8];
        const result = from(source).all((x) => x % 2 === 0);
        expect(result).toBe(true);
    });

    it('returns false when any element does not satisfy the predicate', () => {
        const source = [1, 2, 3, 4];
        const result = from(source).all((x) => x > 0);
        expect(result).toBe(true);
    });

    it('returns false for an empty sequence', () => {
        const source: number[] = [];
        const result = from(source).all((x) => x > 0);
        expect(result).toBe(true);
    });

    it('correctly supplies index to predicate', () => {
        const source = ['a', 'b', 'c'];
        const indices: number[] = [];
        const result = from(source).all((item, index) => {
            indices.push(index);
            return item.length === 1;
        });

        expect(result).toBe(true);
        expect(indices).toEqual([0, 1, 2]);
    });

    it('works with complex objects', () => {
        const source = [
            { name: 'Alice', age: 30 },
            { name: 'Bob', age: 25 },
            { name: 'Charlie', age: 35 },
        ];
        const result = from(source).all((person) => person.age >= 18);
        expect(result).toBe(true);
    });

    it('returns false when at least one complex object does not satisfy the predicate', () => {
        const source = [
            { name: 'Alice', age: 30 },
            { name: 'Bob', age: 15 },
            { name: 'Charlie', age: 35 },
        ];
        const result = from(source).all((person) => person.age >= 18);
        expect(result).toBe(false);
    });
});
