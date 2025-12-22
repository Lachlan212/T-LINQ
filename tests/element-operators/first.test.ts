import { describe, expect, it } from 'vitest';
import { from } from '../../src';

describe('first()', () => {
    it('returns the first element of a sequence', () => {
        const source = [10, 20, 30];
        const result = from(source).first();
        expect(result).toBe(10);
    });

    it('throws an error if the sequence is empty', () => {
        const source: number[] = [];
        expect(() => from(source).first()).toThrowError('The source sequence is empty.');
    });

    it('returns the first element that matches the predicate', () => {
        const source = [1, 2, 3, 4, 5];
        const result = from(source).first((x) => x > 3);
        expect(result).toBe(4);
    });

    it('throws an error if no elements match the predicate', () => {
        const source = [1, 2, 3];
        expect(() => from(source).first((x) => x > 5)).toThrowError(
            'No element satisfies the condition.',
        );
    });

    it('gets the same result on repeated calls - ints', () => {
        const source = [5, 10, 15];
        const sequence = from(source);
        const firstCall = sequence.first();
        const secondCall = sequence.first();
        expect(firstCall).toBe(secondCall);
    });

    it('gets the same result on repeated calls - objects', () => {
        const obj1 = { id: 1 };
        const obj2 = { id: 2 };
        const obj3 = { id: 3 };
        const source = [obj1, obj2, obj3];
        const sequence = from(source);
        const firstCall = sequence.first();
        const secondCall = sequence.first();
        expect(firstCall).toBe(secondCall);
    });

    it('gets the same result on repeated calls - string', () => {
        const source = ['a', 'b', 'c'];
        const sequence = from(source);
        const firstCall = sequence.first();
        const secondCall = sequence.first();
        expect(firstCall).toBe(secondCall);
    });

    it('when first item is undefined returns undefined', () => {
        const source = [undefined, 2, 3];
        const result = from(source).first();
        expect(result).toBeUndefined();
    });

    it('when first item is null returns null', () => {
        const source = [null, 2, 3];
        const result = from(source).first();
        expect(result).toBeNull();
    });

    it('predicate true only first last, returns last', () => {
        const source = [1, 2, 3, 4, 5];
        const result = from(source).first((x) => x === 5);
        expect(result).toBe(5);
    });
});
