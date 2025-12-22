import { from } from '@/index';
import { describe, expect, it } from 'vitest';

describe('any()', () => {
    it('returns true if any element exists in the sequence', () => {
        const source = [1, 2, 3];
        const result = from(source).any();
        expect(result).toBe(true);
    });

    it('returns false for an empty sequence', () => {
        const source: number[] = [];
        const result = from(source).any();
        expect(result).toBe(false);
    });

    it('returns true if any element matches the predicate', () => {
        const source = [1, 2, 3, 4, 5];
        const result = from(source).any((x) => x > 3);
        expect(result).toBe(true);
    });

    it('returns false if no elements match the predicate', () => {
        const source = [1, 2, 3];
        const result = from(source).any((x) => x > 5);
        expect(result).toBe(false);
    });

    it('correctly supplies index to the predicate', () => {
        const source = ['a', 'b', 'c'];
        const indices: number[] = [];
        from(source).any((item, index) => {
            indices.push(index);
            return false;
        });
        expect(indices).toEqual([0, 1, 2]);
    });

    it('works with complex objects and predicates', () => {
        const source = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 3, name: 'Charlie' },
        ];
        const result = from(source).any((x) => x.name.startsWith('B'));
        expect(result).toBe(true);
    });

    it('handles sequences with a single element', () => {
        const source = [42];
        const result = from(source).any();
        expect(result).toBe(true);
    });

    it('handles sequences with undefined elements', () => {
        const source = [undefined, undefined];
        const result = from(source).any();
        expect(result).toBe(true);
    });

    it('handles predicates that always return false', () => {
        const source = [1, 2, 3];
        const result = from(source).any(() => false);
        expect(result).toBe(false);
    });

    it('handles sequences with null elements', () => {
        const source = [null, null];
        const result = from(source).any();
        expect(result).toBe(true);
    });
});
