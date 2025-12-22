import { describe, expect, it } from 'vitest';
import { from } from '../../src/index';

describe('orderBy()', () => {
    it('sorts items in ascending order based on a key selector', () => {
        const source = [5, 3, 8, 1, 2];
        const result = from(source)
            .orderBy((x) => x)
            .toArray();

        expect(result).toEqual([1, 2, 3, 5, 8]);
    });

    it('uses the provided comparer for sorting', () => {
        const source = [
            {
                name: 'Banana',
            },
            {
                name: 'apple',
            },
            {
                name: 'date',
            },
            {
                name: 'cherry',
            },
        ];

        const result = from(source)
            .orderBy(
                (x) => x.name,
                (a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }),
            )
            .toArray();

        expect(result).toEqual([
            { name: 'apple' },
            { name: 'Banana' },
            { name: 'cherry' },
            { name: 'date' },
        ]);
    });

    it('is stable: preserves original order for equal keys', () => {
        const source = [
            { id: 1, group: 'A' },
            { id: 2, group: 'B' },
            { id: 3, group: 'A' },
            { id: 4, group: 'B' },
        ];

        const result = from(source)
            .orderBy((x) => x.group)
            .toArray();

        expect(result).toEqual([
            { id: 1, group: 'A' },
            { id: 3, group: 'A' },
            { id: 2, group: 'B' },
            { id: 4, group: 'B' },
        ]);
    });

    it('handles empty sequences', () => {
        const source: number[] = [];
        const result = from(source)
            .orderBy((x) => x)
            .toArray();

        expect(result).toEqual([]);
    });

    it('handles sequences with one element', () => {
        const source = [42];
        const result = from(source)
            .orderBy((x) => x)
            .toArray();

        expect(result).toEqual([42]);
    });

    it('handles sequences with all equal keys', () => {
        const source = [7, 7, 7, 7];
        const result = from(source)
            .orderBy((x) => x)
            .toArray();

        expect(result).toEqual([7, 7, 7, 7]);
    });

    it('does not iterate until needed', () => {
        let iterationCount = 0;
        const source = [3, 1, 2];

        const sequence = from(source).orderBy((x) => {
            iterationCount++;
            return x;
        });

        expect(iterationCount).toBe(0); // No iteration yet

        const result = sequence.toArray();
        //TODO: when optimized with key caching, this should be 3
        expect(result).toEqual([1, 2, 3]);
    });
});
