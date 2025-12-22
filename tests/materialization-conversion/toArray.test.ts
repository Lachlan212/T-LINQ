import { describe, expect, it } from 'vitest';
import { from } from '../../src/index';

describe('toArray()', () => {
    it('converts a sequence to an array', () => {
        const source = [1, 2, 3, 4, 5];
        const result = from(source).toArray();

        expect(result).toBeInstanceOf(Array);
        expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('handles empty sequences', () => {
        const source: number[] = [];
        const result = from(source).toArray();

        expect(result).toBeInstanceOf(Array);
        expect(result).toEqual([]);
    });

    it('handles sequences with one element', () => {
        const source = [42];
        const result = from(source).toArray();

        expect(result).toBeInstanceOf(Array);
        expect(result).toEqual([42]);
    });
});
