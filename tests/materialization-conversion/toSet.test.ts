import { describe, expect, it } from 'vitest';
import { from } from '../../src/index';

describe('toSet()', () => {
    it('converts a sequence to a Set', () => {
        const source = [1, 2, 2, 3, 4, 4, 5];
        const result = from(source).toSet();

        expect(result).toBeInstanceOf(Set);
        expect(Array.from(result)).toEqual([1, 2, 3, 4, 5]);
    });

    it('handles empty sequences', () => {
        const source: number[] = [];
        const result = from(source).toSet();

        expect(result).toBeInstanceOf(Set);
        expect(Array.from(result)).toEqual([]);
    });

    it('handles sequences with one element', () => {
        const source = [42];
        const result = from(source).toSet();

        expect(result).toBeInstanceOf(Set);
        expect(Array.from(result)).toEqual([42]);
    });
});
