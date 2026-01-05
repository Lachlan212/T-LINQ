import { from } from '@/index';
import { describe, expect, it } from 'vitest';

describe('take()', () => {
    it('returns the specified number of elements from the start of the sequence', () => {
        const source = [1, 2, 3, 4, 5];
        const result = from(source).take(3).toArray();
        expect(result).toEqual([1, 2, 3]);
    });

    it('returns all elements if count is greater than the sequence length', () => {
        const source = [1, 2, 3];
        const result = from(source).take(5).toArray();
        expect(result).toEqual([1, 2, 3]);
    });

    it('returns an empty sequence if count is zero', () => {
        const source = [1, 2, 3];
        const result = from(source).take(0).toArray();
        expect(result).toEqual([]);
    });

    it('returns an empty sequence if count is negative', () => {
        const source = [1, 2, 3];
        const result = from(source).take(-2).toArray();
        expect(result).toEqual([]);
    });

    it('handles empty sequences', () => {
        const source: number[] = [];
        const result = from(source).take(3).toArray();
        expect(result).toEqual([]);
    });
});
