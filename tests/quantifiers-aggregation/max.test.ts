import { from } from '@/index';
import { describe, expect, it } from 'vitest';

describe('max()', () => {
    it('finds the maximum number in a sequence without a selector', () => {
        const source = [5, 3, 8, 1, 4];
        const result = from(source).max();
        expect(result).toBe(8);
    });

    it('finds the maximum value in a sequence of objects with a selector', () => {
        const source = [{ value: 10 }, { value: 5 }, { value: 20 }];
        const result = from(source).max((x) => x.value);
        expect(result).toBe(20);
    });

    it('returns undefined for an empty sequence without a selector', () => {
        const source: number[] = [];
        const result = from(source).max();
        expect(result).toBeUndefined();
    });

    it('returns undefined for an empty sequence with a selector', () => {
        const source: { value: number }[] = [];
        const result = from(source).max((x) => x.value);
        expect(result).toBeUndefined();
    });

    it('handles negative numbers correctly', () => {
        const source = [-10, -20, -5, -15];
        const result = from(source).max();
        expect(result).toBe(-5);
    });

    it('handles mixed positive and negative numbers', () => {
        const source = [10, -5, 0, 5, -10];
        const result = from(source).max();
        expect(result).toBe(10);
    });

    it('handles when a single value is null or undefined in the sequence', () => {
        const source = [3, 1, null, 2];
        const result = from(source).max();
        expect(result).toBe(3);
    });

    it('handles when all values are null or undefined in the sequence', () => {
        const source = [null, undefined, null];
        const result = from(source).max();
        expect(result).toBeUndefined();
    });
});
