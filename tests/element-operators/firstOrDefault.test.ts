import { describe, expect, it } from 'vitest';
import { from } from '../../src/index';

describe('firstOrDefault()', () => {
    it('returns the first element of a sequence', () => {
        const source = [10, 20, 30];
        const result = from(source).firstOrDefault();
        expect(result).toBe(10);
    });

    it('returns undefined if the sequence is empty', () => {
        const source: number[] = [];
        const result = from(source).firstOrDefault();
        expect(result).toBeUndefined();
    });

    it('returns the first element that matches the predicate', () => {
        const source = [1, 2, 3, 4, 5];
        const result = from(source).firstOrDefault((x) => x > 3);
        expect(result).toBe(4);
    });

    it('returns undefined if no elements match the predicate', () => {
        const source = [1, 2, 3];
        const result = from(source).firstOrDefault((x) => x > 5);
        expect(result).toBeUndefined();
    });
});
