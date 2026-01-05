import { from } from '@/index';
import { describe, expect, it } from 'vitest';

describe('skip()', () => {
    it('skips the specified number of elements and returns the rest', () => {
        const source = [1, 2, 3, 4, 5];
        const result = from(source).skip(2).toArray();
        expect(result).toEqual([3, 4, 5]);
    });

    it('returns an empty sequence if count is greater than or equal to the sequence length', () => {
        const source = [1, 2, 3];
        const result = from(source).skip(5).toArray();
        expect(result).toEqual([]);
    });

    it('returns all elements if count is zero', () => {
        const source = [1, 2, 3];
        const result = from(source).skip(0).toArray();
        expect(result).toEqual([1, 2, 3]);
    });

    it('returns all elements if count is negative', () => {
        const source = [1, 2, 3];
        const result = from(source).skip(-2).toArray();
        expect(result).toEqual([1, 2, 3]);
    });

    it('handles empty sequences', () => {
        const source: number[] = [];
        const result = from(source).skip(3).toArray();
        expect(result).toEqual([]);
    });

    it('can be chained with other operators', () => {
        const source = [1, 2, 3, 4, 5, 6];
        const result = from(source).skip(2).take(3).toArray();
        expect(result).toEqual([3, 4, 5]);
    });
});
