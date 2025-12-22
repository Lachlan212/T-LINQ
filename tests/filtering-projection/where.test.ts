import { describe, expect, it } from 'vitest';
import { from } from '../../src/index';

describe('where()', () => {
    it('filters items based on a predicate', () => {
        const source = [1, 2, 3, 4, 5];
        const result = from(source)
            .where((x) => x % 2 === 0)
            .toArray();

        expect(result).toEqual([2, 4]);
    });

    it('correctly supplies index to predicate', () => {
        const source = ['a', 'b', 'c', 'd'];
        let indices: number[] = [];

        const result = from(source)
            .where((_, index) => {
                indices.push(index);
                return true;
            })
            .toArray();

        expect(result).toEqual(source);
        expect(indices).toEqual([0, 1, 2, 3]);
    });
});
