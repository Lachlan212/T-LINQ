import { describe, expect, it } from 'vitest';
import { from } from '../../src/index';

describe('singleOrDefault()', () => {
    it('returns the single element of a sequence', () => {
        const source = [42];
        const result = from(source).singleOrDefault();
        expect(result).toBe(42);
    });

    it('returns undefined if the sequence is empty', () => {
        const source: number[] = [];
        const result = from(source).singleOrDefault();
        expect(result).toBeUndefined();
    });

    it('throws an error if the sequence has more than one element', () => {
        const source = [1, 2];
        expect(() => from(source).singleOrDefault()).toThrowError(
            'The source sequence contains more than one element.',
        );
    });

    it('returns the single element that matches the predicate', () => {
        const source = [1, 2, 3];
        const result = from(source).singleOrDefault((x) => x === 2);
        expect(result).toBe(2);
    });

    it('returns undefined if no elements match the predicate', () => {
        const source = [1, 2, 3];
        const result = from(source).singleOrDefault((x) => x === 5);
        expect(result).toBeUndefined();
    });
});
