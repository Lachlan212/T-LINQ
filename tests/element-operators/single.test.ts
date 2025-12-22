import { describe, expect, it } from 'vitest';
import { from } from '../../src/index';

describe('single()', () => {
    it('returns the single element of a sequence', () => {
        const source = [42];
        const result = from(source).single();
        expect(result).toBe(42);
    });

    it('throws an error if the sequence is empty', () => {
        const source: number[] = [];
        expect(() => from(source).single()).toThrowError('The source sequence is empty.');
    });

    it('throws an error if the sequence has more than one element', () => {
        const source = [1, 2];
        expect(() => from(source).single()).toThrowError(
            'The source sequence contains more than one element.',
        );
    });

    it('returns the single element that matches the predicate', () => {
        const source = [1, 2, 3];
        const result = from(source).single((x) => x === 2);
        expect(result).toBe(2);
    });
});
