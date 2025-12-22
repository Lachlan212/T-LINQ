import { describe, expect, it } from 'vitest';
import { from } from '../../src/index';

describe('groupBy()', () => {
    it('groups elements by a specified key', () => {
        const source = [
            { id: 1, category: 'A' },
            { id: 2, category: 'B' },
            { id: 3, category: 'A' },
            { id: 4, category: 'B' },
            { id: 5, category: 'C' },
        ];

        const result = from(source)
            .groupBy((item) => item.category)
            .toArray();

        expect(result.length).toBe(3);

        const groupA = result.find((g) => g.key === 'A');
        const groupB = result.find((g) => g.key === 'B');
        const groupC = result.find((g) => g.key === 'C');

        expect(groupA).toEqual({
            key: 'A',
            values: [
                { id: 1, category: 'A' },
                { id: 3, category: 'A' },
            ],
        });
        expect(groupB).toEqual({
            key: 'B',
            values: [
                { id: 2, category: 'B' },
                { id: 4, category: 'B' },
            ],
        });
        expect(groupC).toEqual({
            key: 'C',
            values: [{ id: 5, category: 'C' }],
        });
    });

    it('allows projecting elements within each group', () => {
        const source = [
            { id: 1, category: 'A', value: 10 },
            { id: 2, category: 'B', value: 20 },
            { id: 3, category: 'A', value: 30 },
        ];

        const result = from(source)
            .groupBy(
                (item) => item.category,
                (item) => item.value,
            )
            .toArray();

        expect(result.length).toBe(2);

        const groupA = result.find((g) => g.key === 'A');
        const groupB = result.find((g) => g.key === 'B');

        expect(groupA).toEqual({
            key: 'A',
            values: [10, 30],
        });
        expect(groupB).toEqual({
            key: 'B',
            values: [20],
        });
    });

    it('preserves insertion order of groups', () => {
        const source = [
            { id: 1, category: 'B' },
            { id: 2, category: 'A' },
            { id: 3, category: 'C' },
            { id: 4, category: 'A' },
            { id: 5, category: 'B' },
        ];

        const result = from(source)
            .groupBy((item) => item.category)
            .toArray();

        expect(result.map((g) => g.key)).toEqual(['B', 'A', 'C']);
    });
});
