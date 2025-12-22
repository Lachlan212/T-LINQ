import { describe, expect, it } from 'vitest';
import { from } from '../../src/index';

describe('selectMany()', () => {
    it('flattens a sequence of arrays', () => {
        const source = [[1, 2, 3], [4, 5], [6]];
        const result = from(source)
            .selectMany((x) => x)
            .toArray();

        expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('projects and flattens with element selector', () => {
        const source = [1, 2, 3];
        const result = from(source)
            .selectMany((x) => [x, x * 10])
            .toArray();

        expect(result).toEqual([1, 10, 2, 20, 3, 30]);
    });

    it('handles empty source sequence', () => {
        const source: number[][] = [];
        const result = from(source)
            .selectMany((x) => x)
            .toArray();

        expect(result).toEqual([]);
    });

    it('handles empty inner sequences', () => {
        const source = [[1, 2], [], [3]];
        const result = from(source)
            .selectMany((x) => x)
            .toArray();

        expect(result).toEqual([1, 2, 3]);
    });

    it('correctly supplies index to collection selector', () => {
        const source = ['a', 'b', 'c'];
        const indices: number[] = [];

        const result = from(source)
            .selectMany((item, index) => {
                indices.push(index);
                return [item.toUpperCase(), index.toString()];
            })
            .toArray();

        expect(result).toEqual(['A', '0', 'B', '1', 'C', '2']);
        expect(indices).toEqual([0, 1, 2]);
    });

    it('projects with result selector', () => {
        const source = [
            { name: 'Alice', pets: ['dog', 'cat'] },
            { name: 'Bob', pets: ['fish'] },
        ];

        const result = from(source)
            .selectMany(
                (person) => person.pets,
                (person, pet) => `${person.name} has a ${pet}`,
            )
            .toArray();

        expect(result).toEqual(['Alice has a dog', 'Alice has a cat', 'Bob has a fish']);
    });

    it('works with nested objects', () => {
        type Order = { orderId: number; items: string[] };
        const orders: Order[] = [
            { orderId: 1, items: ['apple', 'banana'] },
            { orderId: 2, items: ['orange'] },
            { orderId: 3, items: [] },
        ];

        const result = from(orders)
            .selectMany((order) => order.items)
            .toArray();

        expect(result).toEqual(['apple', 'banana', 'orange']);
    });

    it('does not iterate until needed', () => {
        let collectionSelectorCount = 0;
        const source = [1, 2, 3];

        const sequence = from(source).selectMany((x) => {
            collectionSelectorCount++;
            return [x, x * 2];
        });

        expect(collectionSelectorCount).toBe(0);

        const result = sequence.toArray();
        expect(collectionSelectorCount).toBe(3);
        expect(result).toEqual([1, 2, 2, 4, 3, 6]);
    });

    it('chains multiple selectMany operations', () => {
        const source = [
            [1, 2],
            [3, 4],
        ];
        const result = from(source)
            .selectMany((arr) => arr)
            .selectMany((num) => [num, num + 10])
            .toArray();

        expect(result).toEqual([1, 11, 2, 12, 3, 13, 4, 14]);
    });

    it('handles different return types', () => {
        const source = [1, 2, 3];
        type Result = { value: number };

        const result = from(source)
            .selectMany<Result>((x) => [{ value: x }, { value: x * 2 }])
            .toArray();

        expect(result).toEqual([
            { value: 1 },
            { value: 2 },
            { value: 2 },
            { value: 4 },
            { value: 3 },
            { value: 6 },
        ]);
    });

    it('works with strings as iterable', () => {
        const source = ['ab', 'cd'];
        const result = from(source)
            .selectMany((str) => str)
            .toArray();

        expect(result).toEqual(['a', 'b', 'c', 'd']);
    });

    it('combines with other operators', () => {
        const source = [1, 2, 3];
        const result = from(source)
            .selectMany((x) => [x, x * 2])
            .where((x) => x > 2)
            .select((x) => x * 10)
            .toArray();

        expect(result).toEqual([40, 30, 60]);
    });
});
