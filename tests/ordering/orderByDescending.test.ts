import { describe, expect, it } from 'vitest';
import { from } from '../../src/index';

describe('orderByDescending()', () => {
    it('sorts items in descending order based on a key selector', () => {
        const source = [5, 3, 8, 1, 2];
        const result = from(source)
            .orderByDescending((x) => x)
            .toArray();

        expect(result).toEqual([8, 5, 3, 2, 1]);
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
            .orderByDescending(
                (x) => x.name,
                (a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }),
            )
            .toArray();

        expect(result).toEqual([
            { name: 'date' },
            { name: 'cherry' },
            { name: 'Banana' },
            { name: 'apple' },
        ]);
    });
});
