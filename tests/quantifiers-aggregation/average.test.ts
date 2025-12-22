import { from } from '@/index';
import { describe, expect, it } from 'vitest';

describe('average()', () => {
    it('calculates the average of a sequence of numbers without a selector', () => {
        const source = [10, 20, 30, 40, 50];
        const result = from(source).average();
        expect(result).toBe(30);
    });

    it('calculates the average of a sequence of objects with a selector', () => {
        const source = [{ value: 10 }, { value: 20 }, { value: 30 }, { value: 40 }, { value: 50 }];
        const result = from(source).average((x) => x.value);
        expect(result).toBe(30);
    });

    it('returns 0 for an empty sequence without a selector', () => {
        const source: number[] = [];
        const result = from(source).average();
        expect(result).toBe(0);
    });

    it('returns 0 for an empty sequence with a selector', () => {
        const source: { value: number }[] = [];
        const result = from(source).average((x) => x.value);
        expect(result).toBe(0);
    });

    it('handles negative numbers correctly', () => {
        const source = [-10, -20, -30, -40, -50];
        const result = from(source).average();
        expect(result).toBe(-30);
    });

    it('handles mixed positive and negative numbers', () => {
        const source = [10, -10, 20, -20, 30, -30];
        const result = from(source).average();
        expect(result).toBe(0);
    });
});
