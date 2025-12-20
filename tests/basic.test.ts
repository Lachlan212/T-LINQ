import { describe, expect, it } from 'vitest';
import { from } from '../src/index';

describe('Sequence', () => {
    it('correctly uses lazy operators', () => {
        let count = 0;
        const source = [1, 2, 3, 4, 5];
        const sequence = from(source).where((x) => {
            count++;
            return x > 2;
        });

        expect(count).toBe(0); // No iteration yet

        const result = sequence.toArray();
        expect(count).toBe(5);
        expect(result).toEqual([3, 4, 5]);
    });
});

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

describe('count()', () => {
    it('counts all items when no predicate is provided', () => {
        const source = [1, 2, 3, 4, 5];
        const count = from(source).count();
        expect(count).toBe(5);
    });

    it('counts items matching the predicate', () => {
        const source = [1, 2, 3, 4, 5];
        const count = from(source).count((x) => x % 2 === 0);
        expect(count).toBe(2);
    });
});
