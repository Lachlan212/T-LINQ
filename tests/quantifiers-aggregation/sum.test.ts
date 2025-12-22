import { from } from '@/index';
import { describe, expect, it } from 'vitest';

describe('sum()', () => {
    it('sums numbers in a sequence without a selector', () => {
        const source = [1, 2, 3, 4, 5];
        const result = from(source).sum();
        expect(result).toBe(15);
    });

    it('sums numbers in a sequence with a selector', () => {
        const source = [{ value: 10 }, { value: 20 }, { value: 30 }];
        const result = from(source).sum((x) => x.value);
        expect(result).toBe(60);
    });

    it('returns 0 for an empty sequence without a selector', () => {
        const source: number[] = [];
        const result = from(source).sum();
        expect(result).toBe(0);
    });

    it('returns 0 for an empty sequence with a selector', () => {
        const source: { value: number }[] = [];
        const result = from(source).sum((x) => x.value);
        expect(result).toBe(0);
    });

    it('handles negative numbers correctly', () => {
        const source = [-1, -2, -3, -4, -5];
        const result = from(source).sum();
        expect(result).toBe(-15);
    });

    it('handles mixed positive and negative numbers', () => {
        const source = [10, -5, 15, -10];
        const result = from(source).sum();
        expect(result).toBe(10);
    });
});
