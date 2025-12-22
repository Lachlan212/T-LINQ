import { describe, expect, it } from 'vitest';
import { from } from '../../src/index';

describe('select()', () => {
    it('projects each element of a sequence into a new form', () => {
        const source = [1, 2, 3];
        const result = from(source)
            .select((x) => x * 2)
            .toArray();

        expect(result).toEqual([2, 4, 6]);
    });

    it('correctly supplies index to selector', () => {
        const source = ['a', 'b', 'c'];
        let indices: number[] = [];

        const result = from(source)
            .select((item, index) => {
                indices.push(index);
                return item.toUpperCase();
            })
            .toArray();

        expect(result).toEqual(['A', 'B', 'C']);
        expect(indices).toEqual([0, 1, 2]);
    });

    it('correctly maps to a different type', () => {
        const source = [1, 2, 3];
        type ResultType = { value: number };

        const result = from(source)
            .select<ResultType>((x) => ({ value: x }))
            .toArray();

        expect(result).toEqual([{ value: 1 }, { value: 2 }, { value: 3 }]);
    });

    it('does not iterate until needed', () => {
        let iterationCount = 0;
        const source = [1, 2, 3];

        const sequence = from(source).select((x) => {
            iterationCount++;
            return x * 2;
        });

        expect(iterationCount).toBe(0); // No iteration yet

        const result = sequence.toArray();
        expect(iterationCount).toBe(3);
        expect(result).toEqual([2, 4, 6]);
    });
});
